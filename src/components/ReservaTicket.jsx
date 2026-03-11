import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import '../css/global.css';

const ReservaTicket = ({ reserva }) => {
    const componentRef = useRef();

    // Hook de la librería para manejar la impresión
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Reserva_${reserva.codigo}`,
    });

    if (!reserva) return <p>No hay datos de reserva para mostrar.</p>;

    return (
        <div className="ticket-wrapper">
            {/* Area que se imprimira */}
            <div ref={componentRef} className="ticket-container">
                <div className="ticket-header">
                    <h2>Comprobante de Reserva</h2>
                    <p>Hotel APU - Programación Visual</p>
                    <hr />
                </div>

                <div className="ticket-body">
                    <section>
                        <h4>Datos del Pasajero</h4>
                        <p><strong>Nombre:</strong> {reserva.pasajero.apellido}, {reserva.pasajero.nombre}</p>
                        <p><strong>DNI:</strong> {reserva.pasajero.dni}</p>
                        <p><strong>Nacionalidad:</strong> {reserva.pasajero.nacionalidad}</p>
                    </section>

                    <section>
                        <h4>Datos de la Habitación</h4>
                        <p><strong>Código:</strong> {reserva.habitacion.codigo}</p>
                        <p><strong>Tipo:</strong> {reserva.habitacion.tipo}</p>
                        <p><strong>Costo por noche:</strong> ${reserva.habitacion.costo}</p>
                    </section>

                    <section className="reserva-summary">
                        <h4>Detalle de Estadía</h4>
                        <p><strong>Fecha de Reserva:</strong> {reserva.fechaReserva}</p>
                        <p><strong>Cantidad de Días:</strong> {reserva.cantDias}</p>
                        <div className="total-box">
                            <h3>Total a Pagar: ${reserva.costoTotal}</h3>
                        </div>
                    </section>
                </div>

                <footer className="ticket-footer">
                    <p>Gracias por elegirnos. Presente este ticket al ingresar.</p>
                </footer>
            </div>

        
            <button onClick={handlePrint} className="btn-primary print-btn">
                Descargar Comprobante (PDF)
            </button>
        </div>
    );
};

export default ReservaTicket;
