import { useEffect, useRef } from 'react';
import { useContextAPI } from '../context/ContextAPI';

import Quill from 'quill';
import "quill/dist/quill.snow.css";


const QuillRTC = () => {
  const { data, setData } = useContextAPI();
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],

    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']
  ];


  // Initialize Quill editor
  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions
        }
      });

      // Event listener for text change
      quillRef.current.on('text-change', () => {
        const editorContent = quillRef.current.root.innerHTML;
        setData(editorContent);
      });
    }
  }, [setData]);

  // Update Quill editor content when data changes
  useEffect(() => {
    if (quillRef.current && data !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = data;
    }
  }, [data]);

  return (
    <div ref={editorRef} style={{ height: '800px', background: 'white' }}></div>
  );
}

export default QuillRTC;
