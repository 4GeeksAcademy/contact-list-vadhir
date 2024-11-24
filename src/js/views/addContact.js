import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom";


export function AddContact () {
    const navigate = useNavigate(); 
    const location = useLocation();
    const { actions } = useContext(Context);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (location.state?.contact) {
            setFormData(location.state.contact);
        }
    }, [location.state]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = () => {
        if (location.state?.contact) {
            actions.updateContact(formData);
        } else {
            actions.addContact(formData);
        }
        navigate("/");
    };
    

    const goBackTo = () => { 
        navigate("/");
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="mb-3" style={{ width: '500px' }}>
                <h1 className="text-center">Añade un nuevo contacto</h1>
                
                <label htmlFor="name" className="form-label">Nombre Completo</label>
                <input type="text" className="form-control mb-3" id="name" placeholder="Nombre Completo" onChange={handleChange} />
                
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control mb-3" id="email" placeholder="Correo Electrónico" onChange={handleChange} />
                
                <label htmlFor="phone" className="form-label">Número de Teléfono</label>
                <input type="tel" className="form-control mb-3" id="phone" placeholder="Número de Teléfono" onChange={handleChange} />
                
                <label htmlFor="address" className="form-label">Dirección</label>
                <input type="text" className="form-control mb-3" id="address" placeholder="Dirección" onChange={handleChange} />
                
                <button type="button" className="mb-3 btn btn-primary" style={{ width: '500px' }} onClick={handleSubmit}>Enviar</button>

                <div className="text-center mt-3">
                    <button onClick={goBackTo} className="btn btn-link text-secondary">O regresar a los contactos</button>
                </div>
            </div>
        </div>
    );
};
