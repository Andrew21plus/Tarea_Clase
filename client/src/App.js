import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IBOComponent from './IBOComponent';
import PedidoComponent from './PedidoComponent';
import ArticuloComponent from './ArticuloComponent';
import DetallePedidoComponent from './DetallePedidoComponent';
import PagoComponent from './PagoComponent';
import HomeComponent from './HomeComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Gestión de Pedidos</h1>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/ibos" element={<IBOComponent />} />
          <Route path="/articulos" element={<ArticuloComponent />} />
          <Route path="/pedidos" element={<PedidoComponent />} />
          <Route path="/detallesPedido" element={<DetallePedidoComponent />} />
          <Route path="/pagos" element={<PagoComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
