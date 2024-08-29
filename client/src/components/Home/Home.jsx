import './Home.css';
import { useContextAPI } from '../../context/ContextAPI';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const { authUser } = useContextAPI();
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <h1>Convert PDFs with Ease</h1>
                    <p>Effortlessly manage, edit, and share your PDF files with PDFConnect.</p>
                    <button className="cta-button" onClick={() => {
                        navigate('/docs');
                    }}>Get Started</button>
                </div>
                <div className="hero-image">
                    {/* <img src="/assets/hero-image.jpg" alt="PDF Management" /> */}
                </div>
            </section>

            <section className="features">
                <h2>Features</h2>
                <div className="feature-list">
                    <div className="feature-item">
                        {/* <img src="/assets/feature1.jpg" alt="Feature 1" /> */}
                        <h3>Edit PDFs</h3>
                        <p>Edit your PDF files with our intuitive tools.</p>
                    </div>
                    <div className="feature-item">
                        {/* <img src="/assets/feature2.jpg" alt="Feature 2" /> */}
                        <h3>Convert Files</h3>
                        <p>Convert PDFs to various formats effortlessly.</p>
                    </div>
                    <div className="feature-item">
                        {/* <img src="/assets/feature3.jpg" alt="Feature 3" /> */}
                        <h3>Secure Sharing</h3>
                        <p>Share your PDFs securely with anyone, anywhere.</p>
                    </div>
                </div>
            </section>

            <section className="call-to-action">
                <h2>Start Using PDFConnect Today</h2>
                <p>Join millions of users who manage their PDFs with PDFConnect.</p>
                {!authUser && <button className="cta-button">Sign Up Now</button>}
            </section>
        </div>
    );
}
