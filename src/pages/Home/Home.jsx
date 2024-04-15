import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    7;
    if (email !== "" && senha !== "") {
      alert("teste");
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <div className="home-container">
      <h1>Lista de tarefas</h1>
      <span>Organize suas tarefas de um jeito mais fácil.</span>

      <form className="login" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          autoComplete="false"
          type="password"
          placeholder="*********"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit">Acessar</button>
      </form>
      <Link to={"/register"} className="link-cadastrar">
        Não possui conta? Cadastre-se
      </Link>
    </div>
  );
}

export default Home;
