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
    const [hasAccess, setHasAccess] = useState(false);
    const [documentContent, setDocumentContent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadDocument = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${URL}/doc/accessDoc/${documentID}`, { withCredentials: true });
                const document = response.data.data;
                console.log(document);
                setDocumentContent(document);
                setHasAccess(true);
            } catch (error) {
                console.error('Error checking document:', error);
                navigate('/not-found', { replace: true });
            } finally {
                setIsLoading(false);
            }
        };

        loadDocument();
    }, [documentID, navigate]);

    const handleFileSelected = (file) => {
        setSelectedFile(file);
    };

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
                {isLoading ? (<Spinner />) : hasAccess ? (<QuillRTE initialContent={documentContent} />) : <p>No access to this  document</p>}
            </div>
        </div>
    );
};

export default DocsId;
