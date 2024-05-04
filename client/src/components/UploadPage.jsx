import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ShowPage from './ShowPage';
import 'react-toastify/dist/ReactToastify.css';
import './UploadPage.css';

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzNkYjU4ODZiM2M5MDBjYzdlNDYzNCIsImlhdCI6MTcxNDc0NDM3MSwiZXhwIjoxNzIyNTIwMzcxfQ.u5JmTHOeqTGobQnznaJi14mgQxdgasT7kShfuvbJ6bE';

export default function UploadPage() {
    const [extractedText, setExtractedText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const textAreaRef = useRef(null);

    function handleGetPDFData() {
        try {
            axios.get('http://localhost:8000/getTextFromPDF', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(data => {
                const extractedData = data.data.data.docs[0].pageContent;
                setExtractedText(extractedData);
                toast.success('Data extracted successfully');
            });
        } catch (error) {
            toast.error('Data extraction failed');
            console.log('Error extracting', error.message);
        }
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
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            console.log('PDF uploaded successfully');
            toast.success('PDF uploaded successfully');
        }).catch((err) => {
            console.log('PDF not uploaded', err.message);
            toast.error('PDF upload failed. Please try again.');
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
