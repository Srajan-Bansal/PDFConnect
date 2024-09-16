import './DocsId.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import DragNdrop from './DragNdrop/DragNdrop';
import ButtonGroup from './ButtonGroup/ButtonGroup';
import QuillRTE from './Quill/QuillRTE';
import Spinner from './../../../Spinner';
import URL from './../../../config';

const DocsId = () => {
    const { id: documentID } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [documentExists, setDocumentExists] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkDocumentExists = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${URL}/doc/checkDocumentExists/${documentID}`, { withCredentials: true });
                const { documentExists } = response.data;
                if (!documentExists) {
                    navigate('/not-found');
                } else {
                    setDocumentExists(true);
                }
            } catch (error) {
                console.error('Error checking document:', error);
                navigate('/not-found');
            } finally {
                setIsLoading(false);
            }
        };

        checkDocumentExists();
    }, [documentID, navigate]);

    const handleFileSelected = (file) => {
        setSelectedFile(file);
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (!documentExists) {
        return null;
    }

    return (
        <div className="docs-id-container">
            <Helmet>
                <title>Document Editor - Collaborative Editing</title>
                <meta name="description" content="Edit and manage your documents with real-time collaboration and PDF extraction features." />
                <meta name="keywords" content="document editor, PDF editor, collaborative editing, real-time editing" />
            </Helmet>

            <DragNdrop onFilesSelected={handleFileSelected} width="100%" />
            <div className='content'>
                <ButtonGroup selectedFile={selectedFile} />
                <QuillRTE />
            </div>
        </div>
    );
};

export default DocsId;
