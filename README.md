<h1 align="center">Welcome to PDFConnect 👋</h1>
<p>
  <a href="https://twitter.com/Srajanstwt" target="_blank">
    <img alt="Twitter: Srajanstwt" src="https://img.shields.io/twitter/follow/Srajanstwt.svg?style=social" />
  </a>
</p>

PDFConnect is a robust and feature-rich web application designed for real-time collaborative writing and PDF editing. Built using the MERN stack (MongoDB, Express, React, Node.js), it offers a comprehensive set of tools to allow users to work together seamlessly on text documents and PDFs. Key features include real-time chat, AI-powered question answering, PDF extraction and editing, and system monitoring using Prometheus and Grafana.

## Key Features

- **Real-Time Collaboration**: Edit and write documents simultaneously with other users using a shared rich-text editor (Quill.js). All changes are synced instantly using Socket.io.
- **PDF Extraction and Editing**: Upload, extract content from PDFs, collaboratively edit it, and download it again as a new PDF.
- **Generative AI Integration**: Ask questions and get answers from AI using Google Gemini to improve writing and research productivity.
- **Real-Time Chat**: Communicate with other collaborators via an integrated real-time chat feature built with Socket.io.
- **Authentication**: Secure user login using JSON Web Tokens (JWT) for authentication, ensuring that only authorized users have access to documents.
- **Email Notifications**: Stay updated with real-time email notifications powered by Redis for events such as document edits or collaboration invites.
- **System Monitoring**: Performance monitoring with Docker, Prometheus, and Grafana to track metrics like server health and response times.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.io
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: Google Gemini
- **PDF Editor**: Quill.js
- **Email Notifications**: Redis
- **Monitoring**: Docker, Prometheus, Grafana

> [API documentation](https://documenter.getpostman.com/view/34607742/2sA3duHDw5)

> [Docker images](https://hub.docker.com/repositories/srajanbansal)

## 🚀 Installation and Setup

Make sure you have [npm](https://www.npmjs.com/package/npm) installed

Just run the following command at the root of your project and answer questions: <br />

1. Clone the repository:
   ```sh
   git clone https://github.com/Srajan-Bansal/PDFConnect.git

2. Navigate to the client directory and install dependencies:
    cd client
    ```sh
    npn install
    ```

3. Navigate to the server directory and install dependencies:
    cd server
    ```sh
    npn install
    ```

4. Navigate to the worker directory and install dependencies:
    cd worker
    ```sh
    npn install
    ```

5. Start the development servers:
> In the client directory
  ```sh
    npn run dev
  ```

> In the server directory
   ```sh
    npn start
  ```
    
> In the worker directory
  ```sh
    npn start
   ```

6. Open your browser and navigate to http://localhost:5173 to start using PDFConnect.
7. Open your browser and navigate to http://localhost:8000 for the server and use http://localhost:8000/metrics endpoint for monitoring.


## 🚀 Usage

### Real-Time Collaboration:
- Open a document and start editing. Changes will be synced in real-time with other collaborators.
- Use the integrated chat feature to communicate with collaborators.

### PDF Extraction and Editing:
- Upload a PDF file.
- Extract text from the PDF and edit it collaboratively.
- Download the edited document as a new PDF.

### Generative AI Integration:
- Use the AI-powered question-answering feature to get assistance with writing and research.

### Authentication:
- Securely log in using your credentials. JWT ensures that only authorized users can access documents.

### Email Notifications:
- Receive real-time email notifications for document edits and collaboration invites.

### System Monitoring:
- Monitor the performance of the application using Prometheus and Grafana dashboards.



## Author

👤 **Srajan Bansal**

* Twitter: [@Srajanstwt](https://twitter.com/Srajanstwt)
* Github: [@Srajan-Bansal](https://github.com/Srajan-Bansal)
* LinkedIn: [@srajan-bansal](https://linkedin.com/in/srajan-bansal)

## Show your support

Give a ⭐️ if this project helped you!
