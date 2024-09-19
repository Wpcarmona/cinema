'use client';
import React, { useEffect, useState } from "react";
import { getUsers } from "../../utils/api"; 

interface FindUserProps {
  onBack: () => void;
}

const FindUser: React.FC<FindUserProps> = ({ onBack }) => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.body); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <input type="text" placeholder="Buscar por nombre" />
      <ul>
        {users.map((user) => (
          <li key={user.uid}>
            {user.firstName} - {user.email}
          </li>
        ))}
      </ul>
      {/* Botón para volver a la vista anterior */}
      <button onClick={onBack}>Volver</button>
    </div>
  );
};

export default FindUser;
