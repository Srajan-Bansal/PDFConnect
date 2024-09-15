import './ButtonGroup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContextAPI } from '../../../../context/ContextAPI';
import Button from './../../../Button/Button';
import Chat from './../../../Chat/Chat';
import GenerativeAI from '../../../GenerativeAI/GenerativeAI';
import { showError, showSuccess, showInfo } from './../../../Toast';
import useDownloadPdf from './../../../../hooks/useDownloadPdf';
import URL from './../../../../config';

const ButtonGroup = ({ selectedFile }) => {
    const { quill, setIsExtracted } = useContextAPI();
    const { handleDownload } = useDownloadPdf();
    const [activeComponent, setActiveComponent] = useState(null);
    const navigate = useNavigate();

    const handleClick = (value) => {
        setActiveComponent(prev => (prev === value ? null : value));
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            showError('Please select a PDF file to upload.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('pdf', selectedFile);

            const response = await axios.post(`${URL}/pdf/getDataFromPDF`, formData, { withCredentials: true });
            quill.setText(response.data.text);
            setIsExtracted(true);
            showSuccess('Data extracted successfully');
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const handleDownloadPDF = () => {
        showInfo('Downloading PDF...');
        handleDownload();
    };

    const handleAxiosError = (error) => {
        if (error.response) {
            if (error.response.status === 429) {
                showError('Too many requests, please try again later.');
            } else if (error.response.data.error === 'You are not logged in! Please log in') {
                navigate('/login');
            } else {
                showError(error.response.data.error || 'An error occurred');
            }
        } else if (error.request) {
            showError('Network error: Unable to connect to the server');
        } else {
            showError('An error occurred');
        }
    };

    return (
        <div className="button-group">
            <div className="buttons">
                <Button onClick={handleUpload}>Extract PDF</Button>
                <Button onClick={handleDownloadPDF}>Download PDF</Button>
                <Button onClick={() => handleClick('chat')}>Chat</Button>
                <Button onClick={() => handleClick('gemini')} >Gemini</Button>
            </div>

            {activeComponent === 'chat' && <Chat />}
            {activeComponent === 'gemini' && <GenerativeAI />}
        </div>
    );
};

export default ButtonGroup;
