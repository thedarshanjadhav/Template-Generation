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
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'80vh'}}>
                <div style={{width: '600px', height:'400px', border:'1px solid black', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'gray'}}>
                    <h1 style={{fontSize:'32px', fontWeight:'bold', color:'#fff'}}>Welcome to Grassroot Properties</h1>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
