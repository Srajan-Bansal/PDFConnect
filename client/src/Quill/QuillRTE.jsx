import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useContextAPI } from '../context/ContextAPI';
import { Helmet } from 'react-helmet-async';
import config from '../config';

import Quill from 'quill';
import "quill/dist/quill.snow.css";

import './QullRTE.css';

const SAVE_INTERVAL_MS = 2000;
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'formula'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean']
];

const QuillRTE = () => {
  const [socket, setSocket] = useState(null);
  const { id: documentID } = useParams();
  const { quill, setQuill, isExtracted, setIsExtracted } = useContextAPI();

  // Initlizing Edior
  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, { theme: "snow", modules: { toolbar: toolbarOptions } });
    setQuill(q);
  }, [setQuill]);

  // SOCKET config
  useEffect(() => {
    const s = io(`${config.viewAPI}/document`);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // Loading Document
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", document => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentID);

    return () => {
      if (quill) {
        quill.disable();
        quill.setText('Loading');
      }
    };
  }, [socket, quill, documentID]);

  // Saving Document
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  // Sending text-changes
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", { delta, isExtracted: false });
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  // send-changes when Extracting PDF
  useEffect(() => {
    if (socket == null || quill == null) return;

    if (isExtracted) {
      const data = {
        delta: quill.getContents(),
        isExtracted: true
      }
      socket.emit("send-changes", data);
      setIsExtracted(false);
    }
  }, [socket, quill, isExtracted, setIsExtracted]);

  // recieving text-changes
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = ({ delta, isExtracted }) => {
      if (isExtracted) quill.setContents(delta);
      else quill.updateContents(delta);
    };

    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, quill]);

  // Updating the quill data if data changes
  // useEffect(() => {
  //   if (quill && data !== quill.root.innerHTML) {
  //     quill.setText(data);
  //   }
  // }, [quill, data]);

  return (
    <>
      <Helmet>
        <title>Quill Editor - PDFConnect</title>
        <meta name="description" content="Edit and format documents with Quill, an intuitive text editor integrated with PDFConnect." />
        <meta name="keywords" content="Quill editor, text editor, PDFConnect, document formatting" />
      </Helmet>
      <div className="container" style={{ height: '800px', width: '800px' }} ref={wrapperRef}>

      </div>
    </>
  );
}

export default QuillRTE;
