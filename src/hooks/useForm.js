import { useState } from 'react';

// Esto es el Custom Hook para el manejo de formularios
export const useForm = (initialForm = {}) => {
    
    // Estado que guarda los valores de los campos
    const [formState, setFormState] = useState(initialForm);

    // Función que detecta el cambio en cualquier input
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        
        // Actualizamos solo el campo que cambió usando el atributo 'name'
        setFormState({
            ...formState,
            [name]: value
        });
    };

    // Función para limpiar el formulario después de enviar los datos
    const onResetForm = () => {
        setFormState(initialForm);
    };

    // Retornamos el estado y las funciones para que las use el componente
    return {
        ...formState,     // Desestructura para acceder directo a los campos
        formState,        // El objeto completo, si se llega a necesitar
        onInputChange,    // Función para los 'onChange'
        onResetForm,      // Función para limpiar
    };
};