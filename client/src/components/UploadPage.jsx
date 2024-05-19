import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import config from '../config';

import { useContextAPI } from '../context/ContextAPI';

import 'react-toastify/dist/ReactToastify.css';
import './UploadPage.css';

export default function UploadPage() {
    const [extractedText, setExtractedText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const textAreaRef = useRef(null);

    const { setData } = useContextAPI();

    useEffect(() => {
        setData(extractedText);
    }, [setData, extractedText]);

    const navigate = useNavigate();

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
            setExtractedText(extractedData);
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

    const handleTextAreaChange = (e) => {
        setExtractedText(e.target.value);
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
        }
    }, [extractedText]);


    return (
        <div className="container">
            <label htmlFor="inpFile" className="file-label">Choose File</label>
            <input className='inp-btn' type="file" id="inpFile" accept="application/pdf" onChange={handleFileChange} />
            {selectedFile && (
                <p className="file-info">Selected File: {selectedFile.name}</p>
            )}
            <button type='button' className="extract-btn" onClick={handleUpload}>Extract Pdf</button>
            <textarea
                className="result-text"
                id="resultText"
                placeholder="Your PDF text will appear here..."
                value={extractedText}
                onChange={handleTextAreaChange}
                ref={textAreaRef}
            />
            <button className='btn-gen'>Generate Enriched Data 😎</button>
        </div>
    );
}
