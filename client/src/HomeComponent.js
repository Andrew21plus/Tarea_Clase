import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeComponent = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Bienvenido a la Gestión de Pedidos</h2>
      <div>
        <button onClick={() => navigate('/ibos')}>Gestionar IBOs</button>
        <button onClick={() => navigate('/articulos')}>Gestionar Artículos</button>
        <button onClick={() => navigate('/pedidos')}>Gestionar Pedidos</button>
        <button onClick={() => navigate('/detallesPedido')}>Gestionar Detalles de Pedido</button>
        <button onClick={() => navigate('/pagos')}>Gestionar Pagos</button>
      </div>
    </div>
  );
};

export default HomeComponent;

