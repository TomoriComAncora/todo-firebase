import { useState } from "react";
import {auth} from '../../firebaseConnection'
import {signOut} from 'firebase/auth'
import "./Admin.css";

function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");
  const [tarefas, setTarefas] = useState([]);

  const handleForm = (e) => {
    e.preventDefault();
  };

  const handleSair = async () => {
    await signOut(auth);
  };

  return (
    <div className="admin-container">
      <h1>Minhas tarefas</h1>
      <form className="login" onSubmit={handleForm}>
        <input
          placeholder="Digite sua tarefa..."
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        ></input>
        <button type="submit">Registrar tarefa</button>
      </form>

      <article className="lista">
        <p>Estudar React.js</p>

        <div>
          <button>Editar</button>
          <button id="btn-concluir">Concluir</button>
        </div>
      </article>
      <button id="sair" onClick={handleSair}>
        Sair
      </button>
    </div>
  );
}

export default Admin;
