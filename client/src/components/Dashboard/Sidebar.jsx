import useLogout from "../../hooks/useLogout";

const Sidebar = () => {
    const { logout } = useLogout();

    async function handleLogOut() {
        await logout();
    }

    return (
        <div className="w-1/4 bg-gray-800 text-white flex flex-col items-center p-4">
            <div className="mb-8">
                <img
                    src="https://via.placeholder.com/150"
                    alt="User"
                    className="rounded-full w-32 h-32 object-cover"
                />
            </div>
            <button className="mb-4 py-2 px-6 bg-blue-600 rounded hover:bg-blue-500">
                Update Password
            </button>
            <button className="mb-4 py-2 px-6 bg-red-600 rounded hover:bg-red-500" onClick={handleLogOut}>
                Logout
            </button>
            <button className="py-2 px-6 bg-red-800 rounded hover:bg-red-700">
                Delete Account
            </button>
        </div>
    );
};

export default Sidebar;
