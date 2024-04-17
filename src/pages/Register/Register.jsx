import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (email !== "" && senha !== "") {
      await createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
          navigate("/admin", { replace: true });
        })
        .catch((err) => {
          console.log("Erro ao se cadastrar: " + err);
        });
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <div>
      <div className="home-container">
        <h1>Cadastre-se</h1>
        <span>Cadastre-se de um jeito fácil.</span>

        <form className="login" onSubmit={handleRegister}>
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

          <button type="submit">Cadastrar</button>
        </form>
        <Link to={"/"} className="link-cadastrar">
          Já possui cadastro? Faça seu login!
        </Link>
      </div>
    </div>
  );
}

export default Register;
