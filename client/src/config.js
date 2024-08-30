// config.js
let baseURL;
const env = import.meta.env.VITE_ENVIRONMENT;
if (env === 'development') {
	baseURL = 'http://localhost:8000';
} else {
	baseURL = 'https://pdfconnect-server.onrender.com';
}
// const MobileURL = 'http://192.168.1.9:8000';
const config = {
	userAPI: `${baseURL}/api/v1/user`,
	viewAPI: `${baseURL}`,
};

export default config;
