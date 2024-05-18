import { useRef } from 'react';
import JoditEditor from 'jodit-react';
import { useContextAPI } from '../context/ContextAPI';


const JoditRTC = () => {
	const editor = useRef(null);
	const { data, setData } = useContextAPI();

	const formattedText = data?.replace(/\n/g, '<br>');

	const editorConfig = {
		readonly: false,
		toolbar: true,
		spellcheck: true,
		language: "en",
		toolbarButtonSize: "medium",
		toolbarAdaptive: false,
		showCharsCounter: true,
		showWordsCounter: true,
		showXPathInStatusbar: false,
		askBeforePasteHTML: true,
		askBeforePasteFromWord: true,
		uploader: {
			insertImageAsBase64URI: true,
		},
		width: 1600,
		height: 842,
	};

	const handleBlur = (newContent) => {
		setData(newContent);
	};

	return (
		<JoditEditor
			ref={editor}
			value={formattedText}
			config={editorConfig}
			tabIndex={1}
			onBlur={handleBlur}
		/>
	);
};

export default JoditRTC;
