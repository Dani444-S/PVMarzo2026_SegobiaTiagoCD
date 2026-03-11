import { Link } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <h1>Bienvenido a Hotel APU</h1>
                    <p>Tu descanso soñado a un solo clic de distancia en el corazón de Jujuy.</p>
                    <div className="hero-btns">
                        <Link to="/reservar" className="btn-primary">Ver Habitaciones</Link>
                        <Link to="/register" className="btn-secondary-outline">Crear cuenta</Link>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="feature-card">
                    <span className="feature-icon"></span>
                    <h3>Simplicidad</h3>
                    <p>Reserva en segundos desde cualquier dispositivo.</p>
                </div>
                <div className="feature-card">
                    <span className="feature-icon"></span>
                    <h3>Variedad</h3>
                    <p>Desde habitaciones Simples hasta suites Premium.</p>
                </div>
                <div className="feature-card">
                    <span className="feature-icon"></span>
                    <h3>Control</h3>
                    <p>Gestiona tus reservas y descarga tus comprobantes en PDF.</p>
                </div>
            </section>

            {/* FOOTER Agregado */}
            <footer className="home-footer">
                <p>&copy; 2026 Hotel APU - Facultad de Ingeniería UNJu</p>
                <p>Analista Programador Universitario</p>
            </footer>
        </div>
    );
};

export default Home;