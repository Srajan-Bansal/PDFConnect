import { useState, useEffect } from 'react';
import DocumentTable from './DocumentTable';
import DocumentDialog from './DocumentDialog';
import axios from 'axios';
import { showError } from '../Toast';
import URL from '../../config';

const Docs = () => {
    const [documents, setDocuments] = useState([]);
    const [showMenu, setShowMenu] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);

    useEffect(() => {
        async function getAllUserDocuments() {
            try {
                const response = await axios.get(`${URL}/doc/getUserDocs`, {
                    withCredentials: true,
                });
                setDocuments(response.data);
            } catch (error) {
                console.log(error);
                showError('Cannot fetch documents');
                setDocuments(() => []);
            }
        }

        getAllUserDocuments();
    }, []);

    const handleMenuClick = (uuid) => {
        setShowMenu(showMenu === uuid ? null : uuid);
    };

    const handleDialogOpen = (doc) => {
        setSelectedDoc(doc);
        setShowDialog(true);
    };

    const handleDialogClose = () => {
        setShowDialog(false);
        setSelectedDoc(null);
    };

    const handleTitleChange = async (newTitle) => {
        if (selectedDoc) {
            try {
                const response = await axios.patch(`${URL}/doc/changeTitle/${selectedDoc.uuid}`, {
                    title: newTitle,
                }, {
                    withCredentials: true,
                });

                console.log(response.data);
                setSelectedDoc((prev) => ({ ...prev, title: newTitle }));
            } catch (error) {
                console.log(error);
                showError('Cannot update title');
            }
        }
    };

    const handleRevokeAccess = async (participantId) => {
        try {
            const response = await axios.patch(`${URL}/doc/revokeAccess/${selectedDoc.uuid}`, {
                email: participantId,
            }, {
                withCredentials: true,
            });

            setSelectedDoc(response.data);
            setDocuments((prev) => prev.map(doc => doc.uuid === selectedDoc.uuid ? response.data : doc));
        } catch (error) {
            console.log(error);
            showError('Cannot revoke access');
        }
    };

    const handleDelete = async (uuid) => {
        try {
            const response = await axios.delete(`${URL}/doc/deleteDoc/${uuid}`, {
                withCredentials: true,
            });

            console.log(response.data);
            setDocuments((prev) => prev.filter(doc => doc.uuid !== uuid));
            setSelectedDoc(null);
            setShowDialog(false);
        } catch (error) {
            console.log(error);
            showError('Cannot delete document');
        }
    };

    const handleAddParticipant = async (email) => {
        try {
            const response = await axios.patch(`${URL}/doc/addParticipant/${selectedDoc.uuid}`, { email }, {
                withCredentials: true,
            });

            console.log(response.data);
            console.log('selected ', selectedDoc);
            setSelectedDoc(response.data);
            setDocuments((prev) => prev.map(doc => doc.uuid === selectedDoc.uuid ? response.data : doc));
        } catch (error) {
            console.log(error);
            showError('Cannot add participant');
        }
    };

    const handleCreateDocument = async () => {
        try {
            const response = await axios.get(`${URL}/doc/createDoc`, {
                withCredentials: true,
            });

            console.log(response.data);
            setDocuments((prev) => [response.data, ...prev]);
        } catch (error) {
            console.log(error);
            showError('Cannot create document');
        }
    }

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Your projects</h1>
                    <button className="bg-white text-black py-2 px-4 rounded" onClick={handleCreateDocument}>Create project</button>
                </div>

                <DocumentTable
                    documents={documents}
                    handleMenuClick={handleMenuClick}
                    showMenu={showMenu}
                    handleDialogOpen={handleDialogOpen}
                    handleDelete={handleDelete}
                />

                {showDialog && selectedDoc && (
                    <DocumentDialog
                        selectedDoc={selectedDoc}
                        handleDialogClose={handleDialogClose}
                        handleTitleChange={handleTitleChange}
                        handleRevokeAccess={handleRevokeAccess}
                        handleDelete={handleDelete}
                        handleAddParticipant={handleAddParticipant}
                    />
                )}
            </div>
        </div>
    );
};

export default Docs;
