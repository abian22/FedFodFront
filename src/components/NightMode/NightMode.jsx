import React, { useState } from 'react';
import "./NightMode.scss"
const ModoDiaNocheBoton = () => {
  const [modoDia, setModoDia] = useState(true);

  // Función para cambiar el modo al hacer clic en el botón
  const cambiarModo = () => {
    setModoDia((prevModoDia) => !prevModoDia);
  };

  return (
    <>
    </>
  );
};

export default ModoDiaNocheBoton;
