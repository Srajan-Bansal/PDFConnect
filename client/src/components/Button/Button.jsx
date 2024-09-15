import './Button.css';

const Button = ({ children, onClick, style, className }) => {
    return (
        <button className={`custom-button ${className}`} onClick={onClick} style={style}>
            {children}
        </button>
    );
};

export default Button;
