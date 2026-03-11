import { createContext, useState, useEffect } from 'react';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    // Estado de Habitaciones
    const [rooms, setRooms] = useState(() => {
        const savedRooms = localStorage.getItem('rooms');
        return savedRooms ? JSON.parse(savedRooms) : [
            { codigo: '101', tipo: 'Simple', costo: 2500, estado: 'Disponible', descripcion: 'Cama individual, vista interna.' },
            { codigo: '102', tipo: 'Doble', costo: 4500, estado: 'Disponible', descripcion: 'Cama matrimonial, aire acondicionado.' },
            { codigo: '201', tipo: 'Triple', costo: 6000, estado: 'Disponible', descripcion: 'Tres camas, amplio ventanal.' },
            { codigo: '301', tipo: 'Premium', costo: 10000, estado: 'Disponible', descripcion: 'Suite con hidromasaje y balcón.' }
        ];
    });

    // Estado de Reservas realizadas
    const [reservas, setReservas] = useState(() => {
        const savedReservas = localStorage.getItem('reservas');
        return savedReservas ? JSON.parse(savedReservas) : [];
    });

    // Guarda en LocalStorage cada vez que cambien los datos
    useEffect(() => {
        localStorage.setItem('rooms', JSON.stringify(rooms));
    }, [rooms]);

    useEffect(() => {
        localStorage.setItem('reservas', JSON.stringify(reservas));
    }, [reservas]);

    // Función para crear una Reserva
    const crearReserva = (pasajero, habitacion, cantDias) => {
        // Se calcula el costo total: (Días * Costo Habitación)
        const costoTotal = cantDias * habitacion.costo;

        const nuevaReserva = {
            codigo: `RES-${Date.now()}`, // Código único basado en tiempo
            fechaReserva: new Date().toLocaleDateString(),
            pasajero,
            habitacion,
            cantDias,
            costoTotal
        };

        // Se guarda la reserva
        setReservas([...reservas, nuevaReserva]);

        // Actualiza el estado de la habitación a 'Ocupada' (según consigna)
        const nuevasHabitaciones = rooms.map(r => 
            r.codigo === habitacion.codigo ? { ...r, estado: 'Ocupada' } : r
        );
        setRooms(nuevasHabitaciones);

        return nuevaReserva; // Se retorna para poder mostrar el ticket
    };

const liberarHabitacion = (codigoHabitacion) => {
    // Pone la habitación como disponible
    const nuevasHabitaciones = rooms.map(r => 
        r.codigo === codigoHabitacion ? { ...r, estado: 'Disponible' } : r
    );
    setRooms(nuevasHabitaciones);

    // Es opcional: puede filtrar las reservas para eliminar la que correspondía a esa habitación
    const nuevasReservas = reservas.filter(res => res.habitacion.codigo !== codigoHabitacion);
    setReservas(nuevasReservas);
};

// liberar habitacion
return (
    <RoomContext.Provider value={{ rooms, reservas, crearReserva, liberarHabitacion, setRooms }}>
        {children}
    </RoomContext.Provider>
);

    return (
        <RoomContext.Provider value={{ 
            rooms, 
            reservas, 
            crearReserva,
            setRooms 
        }}>
            {children}
        </RoomContext.Provider>
    );
};
