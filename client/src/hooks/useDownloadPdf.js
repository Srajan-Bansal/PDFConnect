import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { useContextAPI } from '../context/ContextAPI';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const useDownloadPdf = () => {
	const { data } = useContextAPI();

	const handleDownload = () => {
		const text = data.substring(3, data.length - 5);
		const docDefinition = {
			content: [{ text: text, fontSize: 12, margin: [0, 10, 0, 0] }],
		};

		const pdfDocGenerator = pdfMake.createPdf(docDefinition);

		pdfDocGenerator.download('example.pdf');
	};

	return { handleDownload };
};

export default useDownloadPdf;
