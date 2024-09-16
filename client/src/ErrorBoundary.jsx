import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
    const error = useRouteError();

    console.error(error);

    const errorMessage = error?.statusText || error?.message || "An unexpected error has occurred";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
                <p className="text-lg text-gray-700 mb-4">Sorry, something went wrong.</p>
                <p className="text-sm text-gray-500 italic mb-6">
                    <i>{errorMessage}</i>
                </p>
                <a href="/" className="inline-block px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                    Go to Home
                </a>
            </div>
        </div>
    );
};

export default ErrorBoundary;
