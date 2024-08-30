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
                <meta name="description" content="Effortlessly manage, edit, and share your Document files with PDFConnect." />
            </Helmet>
            <div className="home-page">
                <section className="hero">
                    <div className="hero-content">
                        <h1>EDIT DOCUMENT&rsquo;S WITH EASE</h1>
                        <p>Effortlessly manage, edit, and share your Document files with PDFConnect.</p>
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
                            <h3>Edit PDFs</h3>
                            <p>Edit your PDF files with our intuitive tools.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Convert Files</h3>
                            <p>Convert PDFs to various formats effortlessly.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Secure Sharing</h3>
                            <p>Share your PDFs securely with anyone, anywhere.</p>
                        </div>
                    </div>
                </section>

                <section className="call-to-action">
                    <h2>START USING PDFConnect TODAY</h2>
                    <p>Join millions of users who manage their PDFs with PDFConnect.</p>
                    {!authUser && <button className="cta-button">Sign Up Now</button>}
                </section>
            </div>
        </>
    );
}
