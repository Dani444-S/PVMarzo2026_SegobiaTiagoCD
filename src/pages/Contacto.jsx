import { useForm } from '../hooks/useForm';

const Contacto = () => {
    const { nombre, email, mensaje, onInputChange, onResetForm } = useForm({
        nombre: '',
        email: '',
        mensaje: ''
    });

    const handleSend = (e) => {
        e.preventDefault();
        // Aquí simularíamos el envío
        alert(`Gracias ${nombre}, hemos recibido tu mensaje.`);
        onResetForm();
    };

    return (
        <div className="contacto-container">
            <h2>Contacto</h2>
            <form onSubmit={handleSend} className="auth-form">
                <input type="text" name="nombre" placeholder="Tu nombre" value={nombre} onChange={onInputChange} required />
                <input type="email" name="email" placeholder="Tu correo" value={email} onChange={onInputChange} required />
                <textarea name="mensaje" placeholder="¿En qué podemos ayudarte?" value={mensaje} onChange={onInputChange} required />
                <button type="submit" className="btn-primary">Enviar Mensaje</button>
            </form>
        </div>
    );
};

export default Contacto;