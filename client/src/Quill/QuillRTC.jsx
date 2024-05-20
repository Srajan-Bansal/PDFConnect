import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import useDownloadPdf from './../hooks/useDownloadPdf';
import config from '../config';
import Quill from 'quill';
import "quill/dist/quill.snow.css";

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

const QuillRTC = () => {
  const [socket, setSocket] = useState(null);
  const [quill, setQuill] = useState(null);
  const { id: documentID } = useParams();

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, { theme: "snow", modules: { toolbar: toolbarOptions } });
    setQuill(q);
  }, []);

  useEffect(() => {
    const s = io(`${config.viewAPI}/document`);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

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

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, quill]);

  // useEffect(() => {
  //   if (quill && data !== quill.root.innerHTML) {
  //     quill.root.innerHTML = data;
  //   }
  // }, [data, quill]);

  const { handleDownload } = useDownloadPdf();

  async function populateData() {
    // await setData(quill.root.innerHTML);
    // handleDownload();
  }

  return (
    <>
      <button onClick={populateData}>populate pdf</button>
      <button onClick={handleDownload}>Download</button>
      <div className="container" style={{ height: '800px', width: '800px' }} ref={wrapperRef}></div>
    </>
  );
}

export default QuillRTC;
