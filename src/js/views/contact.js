import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export function Contact() {
    const navigate = useNavigate(); 
    const { store, actions } = useContext(Context);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const confirmDeleteContact = (contact) => {
        setSelectedContact(contact);
        setShowDeleteModal(true);
    };
    
    const closeModal = () => {
        setShowDeleteModal(false);
        setSelectedContact(null);
    };

    const deleteContact = async () => {
        if (selectedContact) {
            await actions.deleteContact(selectedContact.id);
            setShowDeleteModal(false);
            setSelectedContact(null);
        }
    };

    const editContact = (contact) => {
        navigate("/addContact", { state: { contact } });
    };

   
    const addContactClick = () => {
        navigate("/addContact");
    };

    useEffect(() => {
        actions.initializeAgenda();
        actions.loadContacts();
    }, []);

    return (
        <div className="d-flex justify-content-center">
            <div style={{ width: '1000px' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Contactos</h2>
                    <button type="button" className="btn btn-success" onClick={addContactClick}>Añadir Contacto</button>
                </div>
                
                {Array.isArray(store.contacts) && store.contacts.length > 0 && (
                    store.contacts.map((contact, index) => (
                        <div key={index} className="contact-cell d-flex border p-3 my-2">
                            <div>
                                <div style={{width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ddd'}}>
                                    <img src={`https://picsum.photos/seed/${index}/50`} alt="contacto" style={{width: '100%', height: '100%', objectFit: 'cover' }}/>
                                 </div>
                            </div>
                            <div className="contact-info ms-3">
                                <h5>{contact.name}</h5>
                                <p><i className="fa-solid fa-location-dot me-2"></i><span style={{ color: '#4a4a4a' }}>{contact.address}</span></p>
                                <p><i className="fa-solid fa-phone-flip me-2"></i><span style={{ color: '#4a4a4a' }}>{contact.phone}</span></p>
                                <p><i className="fa-regular fa-envelope me-2"></i><span style={{ color: '#4a4a4a' }}>{contact.email}</span></p>                            
                            </div>
                            <div className="contact-actions ms-auto">
                                <button onClick={() => editContact(contact)} style={{ border: 'none', background: 'none', marginRight: '10px' }}>
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button onClick={() => confirmDeleteContact(contact)} style={{ border: 'none', background: 'none' }}>
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
                
                {showDeleteModal && (
                    <div className="modal d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">¿Seguro que quieres eliminar este contacto?</h5>
                                    <button type="button" className="btn-close" onClick={closeModal}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Si lo eliminas, algo malo podría pasar.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>¡Oh, no!</button>
                                    <button type="button" className="btn btn-danger" onClick={deleteContact}>¡Hazlo!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

