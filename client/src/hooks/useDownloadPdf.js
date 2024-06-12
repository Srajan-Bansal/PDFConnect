import { useContextAPI } from '../context/ContextAPI';

import pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = window.pdfMake.vfs;

pdfMake.fonts = {
	Roboto: {
		normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
		bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
		italics:
			'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
		bolditalics:
			'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
	},
};

const useDownloadPdf = () => {
	const { data } = useContextAPI();

	const handleDownload = () => {
		// const text = data.substring(3, data.length - 5);
		const docDefinition = {
			content: [{ text: data, fontSize: 12, margin: [0, 10, 0, 0] }],
		};

		const pdfDocGenerator = pdfMake.createPdf(docDefinition);

		pdfDocGenerator.download('example.pdf');
	};

	return { handleDownload };
};

export default useDownloadPdf;
