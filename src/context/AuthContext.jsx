import { createContext, useState, useEffect } from "react";
// Crea el contexto para que esté disponible en toda la App
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Estado para almacenar el usuario logueado
    // Al iniciar, busca si hay un usuario guardado en LocalStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

    // UseEffect para guardar el usuario en LocalStorage cada vez que cambie
    useEffect(() => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    }, [user]);

    // Función para loguear al usuario (Pasajero o Admin)
    const register = (userData) => {
    //se usa 'users-db' para login
    const users = JSON.parse(localStorage.getItem("users-db")) || [];

    const exist = users.find(u => u.dni === userData.dni);
    if (exist) 
        return { success: false, msg: "El DNI ya está registrado." };

    users.push(userData);
    localStorage.setItem("users-db", JSON.stringify(users));
    return { success: true, msg: "Registro exitoso." };
};


const login = (email, password) => {

    const users = JSON.parse(localStorage.getItem('users-db') || '[]');
    
    const validUser = users.find(u => u.email === email && u.password === password);

    if (validUser) {
        setUser(validUser);
        return true;
    }
    return false;
};
    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
    };

    // Retorna el Proveedor con los datos y funciones que los componentes necesitan
    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout, 
            register,
            isAuthenticated: !!user, // Booleano: ¿hay usuario?
            isAdmin: user?.tipo === 'Administrador' // Booleano: ¿es admin?
        }}>
            {children}
        </AuthContext.Provider>
    );
};
