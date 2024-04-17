import { useState } from "react";
import "./Admin.css";

function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");
  const [tarefas, setTarefas] = useState([]);

  const handleForm = (e) => {
    e.preventDefault();
  };

  return (
    <div className="admin-container">
      <h1>Minhas tarefas</h1>
      <form className="login" onSubmit={handleForm}>
        <textarea
          placeholder="Digite sua tarefa..."
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        ></textarea>
        <button type="submit">Registrar tarefa</button>
      </form>
    </div>
  );
}

export default Admin;
