import "quill/dist/quill.snow.css";
import './QullRTE.css';
import Quill from 'quill';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useContextAPI } from './../../../../context/ContextAPI';
import URL, { baseURL, toolbarOptions } from "./../../../../config";
import axios from "axios";
import { showError } from './../../../Toast';
import { Helmet } from 'react-helmet-async';

const QuillRTE = ({ initialContent }) => {
  const [socket, setSocket] = useState(null);
  const { id: documentID } = useParams();
  const { quill, setQuill, isExtracted, setIsExtracted } = useContextAPI();
  const [lastSavedContent, setLastSavedContent] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const SAVE_INTERVAL_MS = import.meta.env.VITE_DOCUMENT_SAVE_INTERVAL_MS;

  // Initialize Editor
  const wrapperRef = useCallback(wrapper => {
    if (!wrapper) return;

    wrapper.innerHTML = '';
    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, { theme: "snow", modules: { toolbar: toolbarOptions } });
    setQuill(q);

    if (initialContent) {
      q.setContents(initialContent);
      setLastSavedContent(initialContent);
    } else {
      q.setText("Start typing here...");
    }
    q.focus();
  }, [setQuill, setLastSavedContent, initialContent]);

  // SOCKET config
  useEffect(() => {
    const s = io(`${baseURL}/document`);
    setSocket(s);

    s.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to socket server');

      // Join the document room as soon as connected
      s.emit('join-document', documentID);
    });

    s.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from socket server');
    });

    return () => {
      s.disconnect();
    };
  }, [documentID]);

  // Re-join document room if needed
  useEffect(() => {
    if (!socket || !isConnected) return;

    // Ensure we're in the right document room
    socket.emit('join-document', documentID);

  }, [socket, isConnected, documentID]);

  // Saving Document
  useEffect(() => {
    if (!quill) return;

    const interval = setInterval(async () => {
      const currentContent = quill.getContents();

      if (JSON.stringify(currentContent) === JSON.stringify(lastSavedContent)) return;

      try {
        await axios.post(`${URL}/doc/saveDocument/${documentID}`, { data: currentContent }, { withCredentials: true });
        setLastSavedContent(currentContent);
        console.log('document saved successfully');
      } catch (error) {
        console.error('Error saving document:', error);
        showError('Error saving document');
      }
    }, SAVE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [socket, quill, documentID, lastSavedContent, SAVE_INTERVAL_MS]);

  // Sending text-changes
  useEffect(() => {
    if (!socket || !quill || !isConnected) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", { documentID, delta, isExtracted: false });
    };

    quill.on("text-change", handler);

    return () => quill.off("text-change", handler);
  }, [socket, quill, documentID, isConnected]);

  // send-changes when Extracting PDF
  useEffect(() => {
    if (!socket || !quill || !isConnected) return;

    if (isExtracted) {
      socket.emit("send-changes", { documentID, delta: quill.getContents(), isExtracted });
      setIsExtracted(false);
    }
  }, [socket, quill, documentID, isExtracted, setIsExtracted, isConnected]);

  // Receiving text-changes
  useEffect(() => {
    if (!socket || !quill) return;

    const handler = ({ delta, isExtracted }) => {
      if (isExtracted) quill.setContents(delta);
      else quill.updateContents(delta);
    };

    socket.on('receive-changes', handler);

    return () => socket.off('receive-changes', handler);
  }, [socket, quill]);

  return (
    <>
      <Helmet>
        <title>Quill Editor - PDFConnect</title>
        <meta name="description" content="Edit and format documents with Quill, an intuitive text editor integrated with PDFConnect." />
        <meta name="keywords" content="Quill editor, text editor, PDFConnect, document formatting" />
      </Helmet>
      <div className="container" ref={wrapperRef}></div>
      {!isConnected && <div className="connection-warning">Connecting to server...</div>}
    </>
  );
}

export default QuillRTE;