import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useContextAPI } from '../context/ContextAPI';

export default function TinyMCE() {
    const editorRef = useRef(null);
    const { data } = useContextAPI();

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    console.log(data);
    const formattedText = data?.replace(/\n/g, '<br>');
    const myAPI = 'hu2j20vdvbbhn968azqbo2j1ua34ru1b17c4l8uy78j34k80';

    return (
        <>
            <Editor
                apiKey={myAPI}
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue={formattedText}
                init={{
                    height: 500,
                    menubar: 'file edit insert view format table tools help',
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <button onClick={log}>Log editor content</button>
        </>
    );
}