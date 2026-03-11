import { useState, useContext } from 'react';
import { RoomContext } from '../context/RoomContext';
import { useNavigate } from 'react-router-dom';
import '../css/Auth.css';

const NuevaHabitacion = () => {
    const { rooms, setRooms } = useContext(RoomContext);
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        codigo: '',
        tipo: 'Simple',
        costo: '',
        descripcion: ''
    });

    const handleCreate = (e) => {
        e.preventDefault();
        
        if (rooms.find(r => r.codigo === form.codigo)) {
            return alert("El código de habitación ya existe.");
        }

        const nueva = {
            ...form,
            costo: Number(form.costo),
            estado: 'Disponible'
        };

        const nuevasHabitaciones = [...rooms, nueva];
        setRooms(nuevasHabitaciones);
        localStorage.setItem('rooms-db', JSON.stringify(nuevasHabitaciones));

        alert("Habitación creada con éxito");
        navigate('/reservar'); // Manda a ver el catálogo actualizado
    };

    return (
        <div className="auth-container">
            <h2>Alta de Nueva Habitación</h2>
            <form onSubmit={handleCreate} className="auth-form">
                <input type="text" placeholder="Código (ej: 101)" required 
                    onChange={e => setForm({...form, codigo: e.target.value})} />
                
                <select onChange={e => setForm({...form, tipo: e.target.value})}>
                    <option value="Simple">Simple</option>
                    <option value="Doble">Doble</option>
                    <option value="Suite">Suite</option>
                </select>

                <input type="number" placeholder="Costo por noche" required 
                    onChange={e => setForm({...form, costo: e.target.value})} />

                <textarea placeholder="Descripción" required 
                    onChange={e => setForm({...form, descripcion: e.target.value})} />

                <button type="submit" className="btn-primary">Registrar Habitación</button>
            </form>
        </div>
    );
};

export default NuevaHabitacion;