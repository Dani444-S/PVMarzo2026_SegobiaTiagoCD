import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RoomProvider } from './context/RoomContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Habitaciones from './pages/Habitaciones';
import Contacto from './pages/Contacto';
import NuevaHabitacion from './pages/NuevaHabitacion';
import PrivateRoute from './components/PrivateRoute';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <RoomProvider>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contacto" element={<Contacto />} />
              
              {/* Rutas Protegidas */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/reservar" element={
                <PrivateRoute>
                  <Habitaciones />
                </PrivateRoute>
              } />
              
              <Route path="/nueva-habitacion" element={
                <PrivateRoute>
                  <NuevaHabitacion />
                </PrivateRoute>
              } />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </RoomProvider>
    </AuthProvider>
  );
}
export default App;