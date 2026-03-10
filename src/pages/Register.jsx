import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import '../css/Auth.css'; // Usamos el CSS que tenías en la foto

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    // Inicializamos el hook personalizado con los campos de la consigna
    const { formState, onInputChange, dni, apellido, nombre, fechaNac, tipo, nacionalidad, email, password } = useForm({
        dni: '',
        apellido: '',
        nombre: '',
        fechaNac: '',
        tipo: 'Pasajero', // Valor por defecto
        nacionalidad: 'Argentina', // Valor por defecto (Enum)
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validación de Datos (Valor Agregado)
        if (dni.length < 7) return setError('El DNI no es válido');
        if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres');

        // Llamamos a la función de registro del contexto
        const result = register(formState);

        if (result.success) {
            alert('Usuario registrado con éxito');
            navigate('/login'); // Redirigimos al login tras el éxito
        } else {
            setError(result.msg);
        }
    };

    return (
        <div className="auth-container">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                {error && <p className="error-msg">{error}</p>}

                <input type="text" name="dni" placeholder="DNI" value={dni} onChange={onInputChange} required />
                <input type="text" name="nombre" placeholder="Nombre" value={nombre} onChange={onInputChange} required />
                <input type="text" name="apellido" placeholder="Apellido" value={apellido} onChange={onInputChange} required />
                <input type="date" name="fechaNac" value={fechaNac} onChange={onInputChange} required />

                {/* Select para el Tipo de Usuario (Enum) */}
                <label>Tipo de Usuario:</label>
                <select name="tipo" value={tipo} onChange={onInputChange}>
                    <option value="Pasajero">Pasajero</option>
                    <option value="Administrador">Administrador</option>
                </select>

                {/* Select para Nacionalidad (Enum) */}
                <label>Nacionalidad:</label>
                <select name="nacionalidad" value={nacionalidad} onChange={onInputChange}>
                    <option value="Argentina">Argentina</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Chile">Chile</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Uruguay">Uruguay</option>
                </select>

                <input type="email" name="email" placeholder="Correo Electrónico" value={email} onChange={onInputChange} required />
                <input type="password" name="password" placeholder="Contraseña" value={password} onChange={onInputChange} required />

                <button type="submit" className="btn-primary">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;