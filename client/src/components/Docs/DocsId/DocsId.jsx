import './DocsId.css';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DragNdrop from './DragNdrop/DragNdrop';
import ButtonGroup from './ButtonGroup/ButtonGroup';
import QuillRTE from './Quill/QuillRTE';

const DocsId = () => {
    const [selectedFile, setSelectedFile] = useState(null);

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
                <QuillRTE />
            </div>
        </div>
    );
};

export default DocsId;
