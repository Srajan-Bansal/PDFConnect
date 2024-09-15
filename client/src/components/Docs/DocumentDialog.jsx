import { X } from 'lucide-react';
import { useState } from 'react';

const DocumentDialog = ({
    selectedDoc,
    handleDialogClose,
    handleTitleChange,
    handleRevokeAccess,
    handleAddParticipant,
}) => {
    const [newTitle, setNewTitle] = useState(selectedDoc.title);
    const [addParticipantEmailInput, setAddParticipantEmailInput] = useState('');
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-8 w-1/2 rounded-lg relative">
                <button className="absolute top-2 right-2 text-white" onClick={handleDialogClose}>
                    <X size={24} />
                </button>

                <div className="flex items-center mb-4">
                    {isEditingTitle ? (
                        <>
                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="w-full py-2 px-4 bg-gray-800 rounded mr-2"
                            />
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => {
                                    handleTitleChange(newTitle);
                                    setIsEditingTitle(false);
                                }}
                            >
                                Change
                            </button>
                        </>
                    ) : (
                        <h2
                            className="text-2xl font-bold cursor-pointer"
                            onClick={() => setIsEditingTitle(true)}
                        >
                            {selectedDoc.title}
                        </h2>
                    )}
                </div>

                <div className="mb-6">
                    <p><strong>Creator:</strong> {selectedDoc.creator.email}</p>
                    <p><strong>Updated at:</strong> {new Date(selectedDoc.updatedAt).toLocaleString()}</p>
                    <p><strong>Created at:</strong> {new Date(selectedDoc.createdAt).toLocaleString()}</p>
                </div>

                <h3 className="text-xl mb-2">Participants</h3>
                <ul className="mb-6">
                    {selectedDoc?.participants?.map((participant) => (
                        <li key={participant._id} className="flex justify-between py-2 px-4 bg-gray-800 rounded mb-2">
                            <span>{participant.name}</span>
                            <button
                                className="text-red-500"
                                onClick={() => handleRevokeAccess(participant.email)}
                            >
                                Revoke Access
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Enter participant's email"
                        value={addParticipantEmailInput}
                        onChange={(e) => setAddParticipantEmailInput(e.target.value)}
                        className="w-full py-2 px-4 bg-gray-800 rounded mb-2"
                    />
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded w-full"
                        onClick={() => {
                            handleAddParticipant(addParticipantEmailInput)
                            setAddParticipantEmailInput('')
                        }}
                    >
                        Add Participant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocumentDialog;
