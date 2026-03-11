import { useForm } from '../hooks/useForm';
import '../css/Contacto.css';

const Contacto = () => {
    const { nombre, email, mensaje, onInputChange, onResetForm } = useForm({
        nombre: '',
        email: '',
        mensaje: ''
    });

    const handleSend = (e) => {
        e.preventDefault();
        alert(`Gracias ${nombre}, hemos recibido tu mensaje. Nos contactaremos a ${email} a la brevedad.`);
        onResetForm();
    };

    return (
        <div className="contacto-page-container">
            <div className="contacto-grid">
                
                <div className="contacto-info">
                    <h2>Ponte en contacto</h2>
                    <p>Si tienes dudas sobre nuestras tarifas para grupos o servicios de larga estadía, no dudes en escribirnos.</p>
                    
                    <div className="info-item">
                        <span className="icon"></span>
                        <div>
                            <h4>Ubicación</h4>
                            <p>Calle Ficticia 123, San Salvador de Jujuy, Argentina</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <span className="icon"></span>
                        <div>
                            <h4>Teléfono</h4>
                            <p>+54 388 422-XXXX</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <span className="icon"></span>
                        <div>
                            <h4>Horario de Atención</h4>
                            <p>Lunes a Viernes: 08:00 - 20:00</p>
                            <p>Sábados: 09:00 - 13:00</p>
                        </div>
                    </div>
                </div>

                <div className="contacto-form-wrapper">
                    <form onSubmit={handleSend} className="contacto-form">
                        <div className="form-group">
                            <label>Nombre Completo</label>
                            <input type="text" name="nombre" placeholder="Ej: Juan Pérez" value={nombre} onChange={onInputChange} required />
                        </div>
                        
                        <div className="form-group">
                            <label>Email de contacto</label>
                            <input type="email" name="email" placeholder="ejemplo@correo.com" value={email} onChange={onInputChange} required />
                        </div>

                        <div className="form-group">
                            <label>Mensaje o Consulta</label>
                            <textarea name="mensaje" placeholder="Escribe tu consulta aquí..." value={mensaje} onChange={onInputChange} required />
                        </div>

                        <button type="submit" className="btn-primary-full">Enviar Mensaje</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Contacto;