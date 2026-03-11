import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import '../css/Auth.css';      

const Login = () => {
     // Extrae la función login del contexto
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    // Usa el hook personalizado para el email y password
    const { email, password, onInputChange } = useForm({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Intenta loguear con los datos del formulario
        const success = login(email, password);

        if (success) {
             // Si es correcto, se navega al Dashboard (Panel Principal)
            navigate('/dashboard');
        } else {
            // Si falla, se muestra un mensaje de error
            setError('Correo o contraseña incorrectos');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>¡Bienvenido!</h2>
                <p>Ingresa tus datos para acceder al sistema.</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <p className="error-msg" style={{color: '#dc2626', marginBottom: '10px'}}>{error}</p>}

                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={onInputChange} 
                            placeholder="ejemplo@correo.com"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={onInputChange} 
                            placeholder="********"
                            required 
                        />
                    </div>

                    <button type="submit" className="btn-auth">Ingresar</button>
                </form>
                
                <div className="auth-footer">
                    ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;