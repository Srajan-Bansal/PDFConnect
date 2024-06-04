import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DragNdrop from './DragNdrop';
import axios from 'axios';
import config from '../../config';

import { useContextAPI } from '../../context/ContextAPI';
import useDownloadPdf from '../../hooks/useDownloadPdf';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DragNdropParent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { quill, setData } = useContextAPI();
    const { handleDownload } = useDownloadPdf();
    const navigate = useNavigate();

    const handleFileSelected = (file) => {
        setSelectedFile(file);
    };

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

    const handleDownlaodPDF = () => {
        setData(quill.getText());
        toast.info('It might take some time to update. If the downloaded PDF content is missing, please retry!', {
            autoClose: 7000
        });
        handleDownload();
    }

    return (
        <>
            <h1>Drag and Drop File Upload</h1>
            <DragNdrop onFilesSelected={handleFileSelected} width="100%" />

            <button type='button' className="extract-btn" onClick={handleUpload}>Extract Pdf</button>

            <button type='button' className="extract-btn" onClick={handleDownlaodPDF}>Download Pdf</button>
        </>
    );
};

export default DragNdropParent;
