import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Este componente envuelve a las rutas que queremos proteger
export const PrivateRoute = ({ children }) => {
    
    // Se obtiene el estado de autenticación desde el Contexto
    const { isAuthenticated } = useContext(AuthContext);

    // Si el usuario está autenticado, permite que vea los 'children' (el componente hijo)
    // Si no está autenticado, lo redirigimos a la página de Login
    return isAuthenticated 
        ? children 
        : <Navigate to="/login" />;
};

export default PrivateRoute;