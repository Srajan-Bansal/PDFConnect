import { useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './UploadPage.css'
// import ShowPage from './ShowPage';
// import { OpenAI } from "@langchain/openai";

// console.log(import.meta.env.VITE_OPENAI_API_KEY)

// const model = new OpenAI({
//     openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY
// });

// async function LangChain(question) {
//     let ans = ""
//     try {
//         let PureExtractedQuestion = question.extractedText + " , Explain This is In Form Of bullet Points";
//         console.log(PureExtractedQuestion)
//         ans = await model.invoke(PureExtractedQuestion);
//         return ans;
//     } catch (e) {
//         console.log(e);
//     }
// }

export default function UploadPage() {
    const [extractedText, setExtractedText] = useState('');
    // const [ans, setAns] = useState("");

    const handleUpload = () => {
        const fileInput = document.getElementById('inpFile');

        if (!fileInput.files.length) {
            toast.error('Please select a PDF file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', fileInput.files[0]);

        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzNkYjU4ODZiM2M5MDBjYzdlNDYzNCIsImlhdCI6MTcxNDY3NTY1NCwiZXhwIjoxNzIyNDUxNjU0fQ.p6RO8JbzVlqro5HQiVKAykLn34XtGXnLDugh2b5OrRs'
        axios.post('http://localhost:8000/uploadFiles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            console.log('PDF uploaded successfully');
            toast.success('PDF uploaded successfully');
        }).catch((err) => {
            console.log('PDF not uploaded', err.message);
            toast.error('PDF upload failed. Please try again.');
        });
    };

    // for handling request  .
    // async function reqs(question) {
    //     const answer = await LangChain(question);
    //     setAns(answer);
    // }

    return (
        <div>
            <div className="container">
                <input className='inp-btn' type="file" id="inpFile" />
                <button type="button" id="btnUpload" onClick={handleUpload}>Upload PDF 📑</button>
                <br />
                <br />
                <textarea
                    style={{ width: '400px', height: '180px' }}
                    id="resultText"
                    placeholder="Your PDF text will appear here..."
                    value={extractedText}
                />
            </div>

            {/* <button className='btn-gen'  >Generate Enriched Data 😎</button>
            onClick={() => reqs({ extractedText })} */}
            {/* <ShowPage data={JSON.stringify(ans)} /> */}
        </div>
    );
}


