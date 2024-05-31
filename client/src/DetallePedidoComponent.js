import React from 'react';

import { Link } from 'react-router-dom'; 
const DetallePedidoComponent = () => {
  
  return (
    <div>
      <h2>Detalle Pedido Management</h2>
      <div> 
          <Link to="/"> 
            <br/>
            <button>Volver a la página principal</button>
          </Link>
        </div>
    </div>
  );
};

export default DetallePedidoComponent;
