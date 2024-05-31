import React from 'react';
import { Link } from 'react-router-dom'; 

const PedidoComponent = () => {
  
  return (
    <div>
      <h2>Pedido Management</h2>
      <div> 
          <Link to="/"> 
            <br/>
            <button>Volver a la página principal</button>
          </Link>
        </div>
    </div>
  );
};

export default PedidoComponent;
