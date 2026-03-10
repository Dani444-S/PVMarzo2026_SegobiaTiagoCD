import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RoomContext } from '../context/RoomContext';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';

const Dashboard = () => {
    const { user, logout, isAdmin } = useContext(AuthContext);
    const { reservas, rooms } = useContext(RoomContext);
    const navigate = useNavigate();

    // Se filtran las reservas: si es Pasajero, solo ve las suyas (por DNI)
    const misReservas = isAdmin 
        ? reservas 
        : reservas.filter(res => res.pasajero.dni === user.dni);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Bienvenido, {user.nombre} {user.apellido}</h1>
                <span className="badge">{user.tipo}</span>
                <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
            </header>

            <div className="dashboard-content">
                {/* Seccion de perfil (Datos relevantes) */}
                <section className="info-card">
                    <h3>Mis Datos</h3>
                    <p><strong>DNI:</strong> {user.dni}</p>
                    <p><strong>Nacionalidad:</strong> {user.nacionalidad}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </section>

                {/* Vista para administrar: estadísticas rápidas */}
                {isAdmin && (
                    <section className="admin-stats">
                        <div className="stat-box">
                            <h4>Habitaciones Totales</h4>
                            <p>{rooms.length}</p>
                        </div>
                        <div className="stat-box">
                            <h4>Reservas Globales</h4>
                            <p>{reservas.length}</p>
                        </div>
                    </section>
                )}

                {/* Seccion de reservas */}
                <section className="reservas-section">
                    <h3>{isAdmin ? 'Todas las Reservas del Hotel' : 'Mis Reservas Actuales'}</h3>
                    
                    {misReservas.length > 0 ? (
                        <table className="reserva-table">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Habitación</th>
                                    <th>Fecha</th>
                                    <th>Días</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {misReservas.map(res => (
                                    <tr key={res.codigo}>
                                        <td>{res.codigo}</td>
                                        <td>{res.habitacion.tipo}</td>
                                        <td>{res.fechaReserva}</td>
                                        <td>{res.cantDias}</td>
                                        <td>${res.costoTotal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ):(
                        <p className="no-data">No hay reservas registradas.</p>)}

                    {/* Botón de acción para el Pasajero */}
                    {!isAdmin && (
                        <button 
                            className="btn-primary action-btn" 
                            onClick={() => navigate('/reservar')}
                        >
                            Nueva Reserva
                        </button>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Dashboard;