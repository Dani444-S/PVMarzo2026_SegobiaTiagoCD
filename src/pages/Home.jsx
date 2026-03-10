import { Link } from 'react-router-dom';
import '../css/global.css';
//Aqui es la presentacion del hotel, cuando entra a la pagina
const Home = () => {
    return (
        <div className="home-container">
            <section className="hero">
                <h1>Bienvenido a Hotel APU</h1>
                <p>Tu descanso soñado a un solo clic de distancia.</p>
                <div className="hero-btns">
                    <Link to="/reservar" className="btn-primary">Ver Habitaciones</Link>
                    <Link to="/register" className="btn-secondary">Crear cuenta</Link>
                </div>
            </section>

            <section className="features">
                <div className="feature-card">
                    <h3>Simplicidad</h3>
                    <p>Reserva en segundos desde cualquier dispositivo.</p>
                </div>
                <div className="feature-card">
                    <h3>Variedad</h3>
                    <p>Desde habitaciones Simples hasta suites Premium.</p>
                </div>
                <div className="feature-card">
                    <h3>Control</h3>
                    <p>Gestiona tus reservas y descarga tus comprobantes en PDF.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;