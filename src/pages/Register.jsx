import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import '../css/Auth.css';

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

     // Inicializa el hook personalizado
    const { formState, onInputChange, dni, apellido, nombre, fechaNac, tipo, nacionalidad, email, password } = useForm({
        dni: '',
        apellido: '',
        nombre: '',
        fechaNac: '',
        tipo: 'Pasajero', // Valor por defecto
        nacionalidad: 'Argentina',  // Valor por defecto
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
          // Validación de Datos (Valor Agregado)
        if (dni.length < 7) return setError('El DNI no es válido');
        if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres');

        // Llama a la función de registro del contexto
        const result = register(formState);

        if (result.success) {
            alert('Usuario registrado con éxito');
            navigate('/login');
        } else {
            setError(result.msg);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card" style={{maxWidth: '500px'}}> {/* Card un poco más ancha */}
                <h2>Registro de Usuario</h2>
                <p>Crea tu cuenta para gestionar tus reservas.</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <p className="error-msg" style={{color: '#dc2626'}}>{error}</p>}

                    <div className="form-group">
                        <label>DNI (8 dígitos)</label>
                        <input 
                            type="text" 
                            name="dni" 
                            placeholder="Ej: 40123456" 
                            value={dni} 
                            onChange={(e) => {
                                // Esta lógica extra impide que escriban letras mientras teclean
                                const val = e.target.value.replace(/\D/g, ""); // Solo deja números
                                onInputChange({ target: { name: 'dni', value: val } });
                            }}
                            maxLength="8"
                            pattern="\d{8}"
                            title="El DNI debe tener exactamente 8 números"
                            required 
                        />
                    </div>

                    <div style={{display: 'flex', gap: '10px'}}>
                        <div className="form-group" style={{flex: 1}}>
                            <label>Nombre</label>
                            <input type="text" name="nombre" placeholder="Nombre" value={nombre} onChange={onInputChange} required />
                        </div>
                        <div className="form-group" style={{flex: 1}}>
                            <label>Apellido</label>
                            <input type="text" name="apellido" placeholder="Apellido" value={apellido} onChange={onInputChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Fecha de Nacimiento</label>
                        <input type="date" name="fechaNac" value={fechaNac} onChange={onInputChange} required />
                    </div>

                {/* Select para el Tipo de Usuario (Enum) */}
                    <div className="form-group">
                        <label>Tipo de Usuario</label>
                        <select name="tipo" value={tipo} onChange={onInputChange}>
                            <option value="Pasajero">Pasajero</option>
                            <option value="Administrador">Administrador</option>
                        </select>
                    </div>

                    <div className="form-group">
                        {/* Select para Nacionalidad (Enum) */}
                        <label>Nacionalidad</label>
                        <select name="nacionalidad" value={nacionalidad} onChange={onInputChange}>
                            <option value="Argentina">Argentina</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Chile">Chile</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Uruguay">Uruguay</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="correo@ejemplo.com" value={email} onChange={onInputChange} required />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" name="password" placeholder="Minimo 8 caracteres" value={password} onChange={onInputChange} required />
                    </div>

                    <button type="submit" className="btn-auth">Finalizar Registro</button>
                </form>

                <div className="auth-footer">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;