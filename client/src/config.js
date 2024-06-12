// config.js
const baseURL = import.meta.env.baseURL || 'http://localhost:8000';
const config = {
	userAPI: `${baseURL}/api/v1/user`,
	viewAPI: `${baseURL}`,
};

export default config;
