import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/global.css'; // el CSS que uses para la barra

const Navbar=() =>{
    const { user, logout, isAuthenticated, isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Al cerrar sesión, se lo mandama al login
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">Hotel APU</Link>
            </div>
            
            <ul className="nav-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>

                {/* Si el usuario está logueado, mostramos opciones privadas */}
                {isAuthenticated ? (
                    <>
                        <li><Link to="/dashboard">Mi Panel</Link></li>
                        
                        {/* Solo el Pasajero puede ver el botón de Reservar */}
                        {!isAdmin && <li><Link to="/reservar">Reservar Habitación</Link></li>}
                        
                        <li className="user-info">
                            <span>{user.nombre} ({user.tipo})</span>
                            <button onClick={handleLogout} className="btn-logout-nav">Salir</button>
                        </li>
                    </>
                ):(
                    <>
                        {/* Si NO está logueado, mostramos Login y Registro */}
                        <li><Link to="/login">Ingresar</Link></li>
                        <li><Link to="/register">Registrarse</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

//Si isAuthenticated es falso, el usuario no ve el enlace a reservar
export default Navbar;