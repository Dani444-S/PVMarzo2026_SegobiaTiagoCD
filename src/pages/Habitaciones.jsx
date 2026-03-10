import { useContext, useState } from 'react';
import { RoomContext } from '../context/RoomContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Habitaciones.css';

const Habitaciones = () => {
    const { rooms, crearReserva } = useContext(RoomContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Estado local para manejar la cantidad de días de cada habitación seleccionada
    const [dias, setDias] = useState(1);

    const handleReserva = (habitacion) => {
        if (dias < 1) {
            alert("La cantidad de días debe ser al menos 1");
            return;
        }

        // Ejecuta la lógica del RoomContext
        const reservaRealizada = crearReserva(user, habitacion, dias);
        
        if (reservaRealizada) {
            alert("¡Reserva realizada con éxito!");
            navigate('/dashboard'); // Opcionalmente, puedes navegar a una página de 'Ticket'
        }
    };

    return (
        <div className="habitaciones-container">
            <h2>Habitaciones Disponibles</h2>
            <p>Selecciona la opción que mejor se adapte a tu estadía.</p>

            <div className="rooms-grid">
                {rooms.map(room => (
                    <div key={room.codigo} className={`room-card ${room.estado === 'Ocupada' ? 'disabled' : ''}`}>
                        <div className="room-header">
                            <h3>{room.tipo}</h3>
                            <span className={`status ${room.estado.toLowerCase()}`}>
                                {room.estado}
                            </span>
                        </div>
                        
                        <div className="room-body">
                            <p className="description">{room.descripcion}</p>
                            <p className="price"><strong>Costo por noche:</strong> ${room.costo}</p>
                            
                            {room.estado === 'Disponible' && (
                                <div className="reserva-controls">
                                    <label>Días de estadía:</label>
                                    <input 
                                        type="number" 
                                        min="1" 
                                        value={dias} 
                                        onChange={(e) => setDias(parseInt(e.target.value))}
                                    />
                                    <button 
                                        className="btn-reserve"
                                        onClick={() => handleReserva(room)}
                                    >
                                        Reservar Ahora
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Habitaciones;