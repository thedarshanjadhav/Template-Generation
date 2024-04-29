// HomePage.jsx
import { useEffect, useState } from "react";

const HomePage = () => {
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const message = localStorage.getItem('successMessage');
        if (message) {
            setSuccessMessage(message);
            localStorage.removeItem('successMessage'); // Remove the message from local storage
        }
    }, []);

    return (
        <div>
            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}
        </div>
    );
};

export default HomePage;
