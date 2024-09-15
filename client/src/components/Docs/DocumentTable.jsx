import { MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

const DocumentTable = ({ documents, handleMenuClick, showMenu, handleDialogOpen, handleDelete }) => {
    return (
        <table className="w-full">
            <thead>
                <tr className="text-left border-b border-gray-700">
                    <th className="py-2">Name</th>
                    <th className="py-2">Creator</th>
                    <th className="py-2">Participants</th>
                    <th className="py-2">Updated at</th>
                    <th className="py-2">Created At</th>
                    <th className="py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {documents?.map((doc) => (
                    <tr key={doc.uuid} className="relative border-b border-gray-700">
                        <td className="py-4">
                            <Link to={`/docs/${doc.uuid}`} className="block w-full h-full">
                                {doc.title}
                            </Link>
                        </td>
                        <td className="py-4">{doc.creator}</td>
                        <td className="py-4">{doc.participants.length}</td>
                        <td className="py-4">{new Date(doc.updatedAt).toLocaleString()}</td>
                        <td className="py-4">{new Date(doc.createdAt).toLocaleString()}</td>
                        <td className="py-4 relative">
                            <MoreVertical
                                className="cursor-pointer"
                                size={20}
                                onClick={() => handleMenuClick(doc.uuid)}
                            />
                            {showMenu === doc.uuid && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded z-10">
                                    <button
                                        className="block w-full py-2 px-4 text-left hover:bg-gray-700"
                                        onClick={() => handleDialogOpen(doc)}
                                    >
                                        Dashboard
                                    </button>
                                    <button
                                        className="block w-full py-2 px-4 text-left bg-red-500 hover:bg-red-700"
                                        onClick={() => handleDelete(doc.uuid)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DocumentTable;
