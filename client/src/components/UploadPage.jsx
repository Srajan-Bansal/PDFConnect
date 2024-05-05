import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ShowPage from './ShowPage';
import 'react-toastify/dist/ReactToastify.css';
import './UploadPage.css';

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mzc4YmJmMjdiNTk3MjY3NWI5ZmU0NiIsImlhdCI6MTcxNDkxNjI4NywiZXhwIjoxNzIyNjkyMjg3fQ.uHejTT1YtU6zef4nPZKOvqGcLO2lhrf9c_r47mmkCPM';

export default function UploadPage() {
    const [extractedText, setExtractedText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const textAreaRef = useRef(null);

    function handleGetPDFData() {
        axios.get('http://localhost:8000/getTextFromPDF', {
            withCredentials: true
        }).then(response => {
            const extractedData = response.data.data.docs[0].pageContent;
            setExtractedText(extractedData);
            toast.success('Data extracted successfully');
        }).catch(error => {
            if (error.response) {
                toast.error(error.response.data.error);
                console.log('Error response:', error.response.data);
            } else if (error.request) {
                toast.error('No response from server');
                console.log('No response from server');
            } else {
                toast.error('An error occurred');
                console.log('Error:', error.message);
            }
        });
    }



    const handleUpload = () => {
        const fileInput = document.getElementById('inpFile');

        if (!fileInput.files.length) {
            toast.error('Please select a PDF file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', fileInput.files[0]);
        axios.post('http://localhost:8000/uploadFiles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }).then(() => {
            console.log('PDF uploaded successfully');
            toast.success('PDF uploaded successfully');
        }).catch((err) => {
            console.log('PDF not uploaded', err.message);
            // console.log(err);
            toast.error(err.response.data.error);
        });
    };

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
