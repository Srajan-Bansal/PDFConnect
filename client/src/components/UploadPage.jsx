import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import config from '../config';
// import ShowPage from './ShowPage';
import 'react-toastify/dist/ReactToastify.css';
import './UploadPage.css';

export default function UploadPage() {
    const [extractedText, setExtractedText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const textAreaRef = useRef(null);

    const navigate = useNavigate();

    async function handleGetPDFData() {
        try {
            const response = await axios.get(`${config.viewAPI}getTextFromPDF`, { withCredentials: true });
            const extractedData = response.data.data.docs[0].pageContent;
            setExtractedText(extractedData);
            toast.success('Data extracted successfully');
        } catch (error) {
            handleAxiosError(error);
        }
    }

    async function handleUpload() {
        try {
            if (!selectedFile) {
                toast.error('Please select a PDF file to upload.');
                return;
            }

            const formData = new FormData();
            formData.append('pdf', selectedFile);

            await axios.post(`${config.viewAPI}uploadPDF`, formData, { withCredentials: true });
            console.log('PDF uploaded successfully');
            toast.success('PDF uploaded successfully');
        } catch (error) {
            handleAxiosError(error);
        }
    }

    function handleAxiosError(error) {
        if (error.response) {
            if (error.response.data.error === 'You are not logged in! Please log in') {
                navigate('/login');
            }
            toast.error(error.response.data.error);
            console.log('Error response:', error.response.data);
        } else if (error.request) {
            toast.error('No response from server');
            console.log('No response from server');
        } else {
            toast.error('An error occurred');
            console.log('Error:', error.message);
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
            <input className='inp-btn' type="file" id="inpFile" onChange={handleFileChange} />
            {selectedFile && (
                <p className="file-info">Selected File: {selectedFile.name}</p>
            )}
            <button type='button' className="extract-btn" onClick={handleUpload}>Upload Pdf</button>
            <button type='button' className="extract-btn" onClick={handleGetPDFData}>Extract data</button>
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
