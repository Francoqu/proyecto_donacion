import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Perfil = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error al obtener perfil:', error));
  }, [userId]);

  return (
    <div>
      {user ? (
        <>
          <h1>Perfil de {user.first_name} {user.last_name}</h1>
          <p>Email: {user.email}</p>
          <p>Teléfono: {user.phone || 'No disponible'}</p>
        </>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default Perfil;
