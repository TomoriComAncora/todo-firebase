import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Home.css";

function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" && senha !== "") {
      await signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
          navigate("/admin", { replace: true });
        })
        .catch(() => {
          console.log("Não foi possivel fazer o login");
        });
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
