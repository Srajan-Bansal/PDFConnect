// config.js
let base;
const env = import.meta.env.VITE_ENVIRONMENT;
if (env === 'development') {
	base = 'http://localhost:8000';
} else {
	base = 'https://pdfconnect-server.onrender.com';
}
// const MobileURL = 'http://192.168.1.9:8000';

const URL = `${base}/api/v1`;

export const baseURL = base;

export const toolbarOptions = [
	['bold', 'italic', 'underline', 'strike'],
	['blockquote', 'code-block'],
	['link', 'formula'],
	[{ header: 1 }, { header: 2 }],
	[{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
	[{ script: 'sub' }, { script: 'super' }],
	[{ indent: '-1' }, { indent: '+1' }],
	[{ direction: 'rtl' }],
	[{ size: ['small', false, 'large', 'huge'] }],
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ color: [] }, { background: [] }],
	[{ font: [] }],
	[{ align: [] }],
	['clean'],
];

export default URL;
