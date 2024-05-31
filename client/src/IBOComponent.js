import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom'; 
import './IBOComponent.css'; 

const IBOComponent = () => {
  const [formData, setFormData] = useState({
    nombreIBO: '',
    telefonoDiurno: '',
    direccion: '',
    numeroIdentificacionDomicilio: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    correoElectronico: '',
    telefonoEntrega: ''
  });
  const [ibos, setIBOs] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentIBO, setCurrentIBO] = useState(null);

  useEffect(() => {
    getIBOS();
  }, []);

  const getIBOS = () => {
    Axios.get("http://localhost:3307/ibos")
      .then(response => {
        setIBOs(response.data);
      })
      .catch(error => {
        console.error('Error fetching IBOs:', error);
      });
  }

  const addIBO = (e) => {
    e.preventDefault();
    if (editing) {
      Axios.put(`http://localhost:3307/update/${currentIBO.numeroibo}`, formData)
        .then(() => {
          alert("IBO Actualizado");
          setFormData({
            nombreIBO: '',
            telefonoDiurno: '',
            direccion: '',
            numeroIdentificacionDomicilio: '',
            ciudad: '',
            estado: '',
            codigoPostal: '',
            correoElectronico: '',
            telefonoEntrega: ''
          });
          setEditing(false);
          setCurrentIBO(null);
          getIBOS();
        })
        .catch(error => {
          console.error('Error actualizando el IBO:', error);
        });
    } else {
      Axios.post("http://localhost:3307/create", formData)
        .then(() => {
          alert("IBO Registrado");
          setFormData({
            nombreIBO: '',
            telefonoDiurno: '',
            direccion: '',
            numeroIdentificacionDomicilio: '',
            ciudad: '',
            estado: '',
            codigoPostal: '',
            correoElectronico: '',
            telefonoEntrega: ''
          });
          getIBOS();
        })
        .catch(error => {
          console.error('Error registrando el IBO:', error);
        });
    }
  };

  const deleteIBO = (id) => {
    Axios.delete(`http://localhost:3307/delete/${id}`)
      .then(() => {
        alert("IBO Eliminado");
        getIBOS();
      })
      .catch(error => {
        console.error('Error eliminando el IBO:', error);
      });
  };

  const editIBO = (ibo) => {
    setEditing(true);
    setCurrentIBO(ibo);
    setFormData({
      nombreIBO: ibo.nombreibo,
      telefonoDiurno: ibo.telefonodiurno,
      direccion: ibo.direccion,
      numeroIdentificacionDomicilio: ibo.numeroidentificaciondomicilio,
      ciudad: ibo.ciudad,
      estado: ibo.estado,
      codigoPostal: ibo.codigopostal,
      correoElectronico: ibo.correoelectronico,
      telefonoEntrega: ibo.telefonoentrega
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>IBO Management</h2>
      <form onSubmit={addIBO} className="ibo-form">
        <input type="text" name="nombreIBO" placeholder="Nombre" value={formData.nombreIBO} onChange={handleInputChange} />
        <input type="text" name="telefonoDiurno" placeholder="Teléfono Diurno" value={formData.telefonoDiurno} onChange={handleInputChange} />
        <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleInputChange} />
        <input type="text" name="numeroIdentificacionDomicilio" placeholder="ID Domicilio" value={formData.numeroIdentificacionDomicilio} onChange={handleInputChange} />
        <input type="text" name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleInputChange} />
        <input type="text" name="estado" placeholder="Estado" value={formData.estado} onChange={handleInputChange} />
        <input type="text" name="codigoPostal" placeholder="Código Postal" value={formData.codigoPostal} onChange={handleInputChange} />
        <input type="email" name="correoElectronico" placeholder="Correo Electrónico" value={formData.correoElectronico} onChange={handleInputChange} />
        <input type="text" name="telefonoEntrega" placeholder="Teléfono de Entrega" value={formData.telefonoEntrega} onChange={handleInputChange} /> <br/>
        <button type="submit">{editing ? "Actualizar IBO" : "Agregar IBO"}</button> 
      
        <div> 
          <Link to="/"> 
            <br/>
            <button>Volver a la página principal</button>
          </Link>
        </div>
      </form>
      <h2>Lista de IBOs</h2>
      <table className="ibo-table">
        <thead>
          <tr>
            <th>Numero IBO</th>
            <th>Nombre</th>
            <th>Teléfono Diurno</th>
            <th>Dirección</th>
            <th>ID Domicilio</th>
            <th>Ciudad</th>
            <th>Estado</th>
            <th>Código Postal</th>
            <th>Correo Electrónico</th>
            <th>Teléfono de Entrega</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ibos.map(ibo => (
            <tr key={ibo.numeroibo}>
              <td>{ibo.numeroibo}</td>
              <td>{ibo.nombreibo}</td>
              <td>{ibo.telefonodiurno}</td>
              <td>{ibo.direccion}</td>
              <td>{ibo.numeroidentificaciondomicilio}</td>
              <td>{ibo.ciudad}</td>
              <td>{ibo.estado}</td>
              <td>{ibo.codigopostal}</td>
              <td>{ibo.correoelectronico}</td>
              <td>{ibo.telefonoentrega}</td>
              <td>
                <button onClick={() => editIBO(ibo)}>Editar</button>
                <button onClick={() => deleteIBO(ibo.numeroibo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IBOComponent;
