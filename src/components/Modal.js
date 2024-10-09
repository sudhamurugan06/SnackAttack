import React from 'react';
import './Modal.css'; // Import CSS for modal styling

const Modal = ({ message, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>🎉 {message} 🎉</h2>
            </div>
        </div>
    );
};

export default Modal;