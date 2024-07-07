const UserDetails = () => {
    return (
        <div className="w-3/4 p-8">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">User Details</h1>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Name:</label>
                <p className="text-lg text-gray-800">John Doe</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Email:</label>
                <p className="text-lg text-gray-800">john.doe@example.com</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Date of Birth:</label>
                <p className="text-lg text-gray-800">01/01/1990</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Contact Number:</label>
                <p className="text-lg text-gray-800">123-456-7890</p>
            </div>
        </div>
    );
};

export default UserDetails;
