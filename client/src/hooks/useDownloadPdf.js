import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { useContextAPI } from '../context/ContextAPI';

const useDownloadPdf = () => {
	pdfMake.vfs = pdfFonts.pdfMake.vfs;

	const { data } = useContextAPI();

	const handleDownload = () => {
		// Create a new PDF document
		const docDefinition = {
			content: [
				// { text: 'Hello, world!', fontSize: 16, bold: true },
				{ text: data, fontSize: 12, margin: [0, 10, 0, 0] },
			],
		};

		// Generate the PDF document
		const pdfDocGenerator = pdfMake.createPdf(docDefinition);

		// Download the PDF document
		pdfDocGenerator.download('example.pdf');
	};

	return { handleDownload };
};

export default useDownloadPdf;
