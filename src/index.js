


//frontend/src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Importando a folha de estilos CSS para usar as classes do Bootstrap
// Adicione esta linha apenas neste arquivo
import "bootstrap/dist/css/bootstrap.min.css"; 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // Monta o componente App dentro do elemento com ID "root"
);
