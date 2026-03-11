import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo2.jpg';
import '../css/Navbar.css';

const Navbar = () => {
    const { user, logout, isAuthenticated, isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">

                <Link to="/" className="logo-link">
                    <img src={logo} alt="Hotel APU Logo" className="navbar-logo" />
                    <span>Hotel APU</span>
                </Link>
            </div>
            
            <ul className="nav-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>

                {isAuthenticated ? (
                    <>
                        <li><Link to="/dashboard">Mi Panel</Link></li>
                        {!isAdmin && <li><Link to="/reservar">Reservar Habitación</Link></li>}
                        
                        <li className="user-info">
                            <span className="user-name">{user.nombre} ({user.tipo})</span>
                            <button onClick={handleLogout} className="btn-logout-nav">Salir</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login" className="btn-login">Ingresar</Link></li>
                        <li><Link to="/register" className="btn-register">Registrarse</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;