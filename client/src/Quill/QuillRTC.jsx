import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import useDownloadPdf from './../hooks/useDownloadPdf';
import { useContextAPI } from '../context/ContextAPI';

import config from '../config';

import Quill from 'quill';
import "quill/dist/quill.snow.css";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../components/UploadPage.css'

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
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { setData } = useContextAPI();
  const { handleDownload } = useDownloadPdf();

  // Initlizing Edior
  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, { theme: "snow", modules: { toolbar: toolbarOptions } });
    setQuill(q);
  }, []);

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
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  // recieving text-changes
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


  // PDF Handle LOgic
  async function handleUpload() {
    try {
      if (!selectedFile) {
        toast.error('Please select a PDF file to upload.');
        return;
      }

      const formData = new FormData();
      formData.append('pdf', selectedFile);

      const response = await axios.post(`${config.viewAPI}/getDataFromPDF`, formData, { withCredentials: true });
      const extractedData = response.data[0].pageContent;
      setData(extractedData);
      toast.success('Data extracted successfully');
    } catch (error) {
      handleAxiosError(error);
    }
  }

  function handleAxiosError(error) {
    if (error.response) {
      if (error.response.status === 429) {
        toast.error('Too many requests, please try again later.');
      } else if (error.response.data.error === 'You are not logged in! Please log in') {
        navigate('/login');
      } else {
        toast.error(error.response.data.error || 'An error occurred');
      }
    } else if (error.request) {
      toast.error('Network error: Unable to connect to the server');
    } else {
      toast.error('An error occurred');
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleDownlaodPDF = () => {
    setData(quill.getText());
    toast.info('If might some time to update. If Downlaoded PDF content is missing, RETRY!', {
      autoClose: 7000
    });
    handleDownload();
  }

  return (
    <>
      <label htmlFor="inpFile" className="file-label">Choose File</label>
      <input className='inp-btn' type="file" id="inpFile" accept="application/pdf" onChange={handleFileChange} />
      {selectedFile && (
        <p className="file-info">Selected File: {selectedFile.name}</p>
      )}
      <button type='button' className="extract-btn" onClick={handleUpload}>Extract Pdf</button>

      <button type='button' className="extract-btn" onClick={handleDownlaodPDF}>Download Pdf</button>

      <div className="container" style={{ height: '800px', width: '800px' }} ref={wrapperRef}>

      </div>
    </>
  );
}

export default QuillRTC;
