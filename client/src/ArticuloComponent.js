import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './ArticuloComponent.css'; 

const ArticuloComponent = () => {
  const [formData, setFormData] = useState({
    descripcion: '',
    color: '',
    precio: ''
  });

  const [articulos, setArticulos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentArticulo, setCurrentArticulo] = useState(null);

  useEffect(() => {
    getArticulos();
  }, []);

  const getArticulos = () => {
    Axios.get("http://localhost:3308/articulos")
      .then(response => {
        setArticulos(response.data);
      })
      .catch(error => {
        console.error('Error fetching articulos:', error);
      });
  };

  const addOrUpdateArticulo = (e) => {
    e.preventDefault();
    if (editing) {
      Axios.put(`http://localhost:3308/articulos/${currentArticulo.numeroarticulo}`, formData)
        .then(() => {
          alert("Artículo Actualizado");
          setFormData({
            descripcion: '',
            color: '',
            talla: '',
            precio: ''
          });
          setEditing(false);
          setCurrentArticulo(null);
          getArticulos();
        })
        .catch(error => {
          console.error('Error actualizando el artículo:', error);
        });
    } else {
      Axios.post("http://localhost:3308/articulos", formData)
        .then(() => {
          alert("Artículo Registrado");
          setFormData({
            descripcion: '',
            color: '',
            talla: '',
            precio: ''
          });
          getArticulos();
        })
        .catch(error => {
          console.error('Error registrando el artículo:', error);
        });
    }
  };

  const deleteArticulo = (id) => {
    Axios.delete(`http://localhost:3308/articulos/${id}`)
      .then(() => {
        alert("Artículo Eliminado");
        getArticulos();
      })
      .catch(error => {
        console.error('Error eliminando el artículo:', error);
      });
  };

  const editArticulo = (articulo) => {
    setEditing(true);
    setCurrentArticulo(articulo);
    setFormData({
      descripcion: articulo.descripcion,
      color: articulo.color,
      talla: articulo.talla,
      precio: articulo.precio
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Articulo Management</h2>
      <form onSubmit={addOrUpdateArticulo} className="articulo-form">
        <input type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleInputChange} />
        <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleInputChange} />
        <input type="text" name="talla" placeholder="Talla" value={formData.talla} onChange={handleInputChange} />
        <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleInputChange} /> <br/>
        <button type="submit">{editing ? "Actualizar Artículo" : "Agregar Artículo"}</button> 
      
        <div> 
          <Link to="/"> 
            <br/>
            <button>Volver a la página principal</button>
          </Link>
        </div>
      </form>
      <h2>Lista de Artículos</h2>
      <table className="articulo-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Color</th>
            <th>Talla</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {articulos.map(articulo => (
            <tr key={articulo.numeroarticulo}>
              <td>{articulo.numeroarticulo}</td>
              <td>{articulo.descripcion}</td>
              <td>{articulo.color}</td>
              <td>{articulo.talla}</td>
              <td>{articulo.precio}</td>
              <td>
                <button onClick={() => editArticulo(articulo)}>Editar</button>
                <button onClick={() => deleteArticulo(articulo.numeroarticulo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticuloComponent;
