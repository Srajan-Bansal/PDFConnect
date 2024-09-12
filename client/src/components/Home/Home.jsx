import './Home.css';
import { Helmet } from 'react-helmet-async';
import { useContextAPI } from '../../context/ContextAPI';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const { authUser } = useContextAPI();
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>PDFConnect - Home</title>
                <meta name="description" content="Collaborate and manage your PDFs in real-time with PDFConnect, featuring real-time editing, collaborative tools, and more." />
            </Helmet>
            <div className="home-page">
                <section className="hero">
                    <div className="hero-content">
                        <h1>COLLABORATE ON PDFs IN REAL TIME</h1>
                        <p>Experience seamless real-time PDF editing and collaboration with PDFConnect. Manage, edit, and share your documents effortlessly.</p>
                        <button className="cta-button" aria-label="Start editing PDFs now" onClick={() => {
                            navigate('/docs');
                        }}>Get Started</button>
                    </div>
                    <div className="hero-image">
                    </div>
                </section>

                <section className="features">
                    <h2>FEATURES</h2>
                    <div className="feature-list">
                        <div className="feature-item">
                            <h3>Real-Time Collaboration</h3>
                            <p>Edit PDFs simultaneously with others, seeing changes in real-time.</p>
                        </div>
                        <div className="feature-item">
                            <h3>PDF Extraction & Editing</h3>
                            <p>Extract text from PDFs and make collaborative edits with ease.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Secure & Responsive</h3>
                            <p>Securely manage and share your PDFs with a responsive, user-friendly interface.</p>
                        </div>
                    </div>
                </section>

                <section className="call-to-action">
                    <h2>JOIN THE PDFConnect COMMUNITY TODAY</h2>
                    <p>Collaborate on documents with ease and efficiency. Become part of the PDFConnect community now.</p>
                    {!authUser && <button className="cta-button">Sign Up Now</button>}
                </section>
            </div>
        </>
    );
}
