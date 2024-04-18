import { useState, useEffect } from "react";
import { auth, db } from "../../firebaseConnection";
import { signOut } from "firebase/auth";
import {
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import "./Admin.css";

function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [editar, setEditar] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const carregarTarefas = async () => {
      const detalhesDoUsuario = localStorage.getItem("@datalhesUsuario");
      setUser(JSON.parse(detalhesDoUsuario));

      if (detalhesDoUsuario) {
        const dados = JSON.parse(detalhesDoUsuario);
        const refTarefas = collection(db, "tarefas");
        const q = query(
          refTarefas,
          orderBy("create", "desc"),
          where("uid", "==", dados?.uid)
        );
        const logado = onSnapshot(q, (snapshot) => {
          let lista = [];
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              uid: doc.data().uid,
            });
          });
          console.log(lista);
          setTarefas(lista);
        });
      }
    };

    carregarTarefas();
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    if (tarefaInput === "") {
      alert("Digite uma tarefa...");
      return;
    }

    if (editar?.id) {
      handleAtualizarTarefa();
      return;
    }

    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefaInput,
      create: new Date(),
      uid: user?.uid,
    })
      .then(() => {
        console.log("Tarefa cadastrada");
        setTarefaInput("");
      })
      .catch((err) => {
        console.log("Erro ao cadastrar tareda: " + err);
      });
  };

  const handleSair = async () => {
    await signOut(auth);
  };

  const deletarTarefa = async (id) => {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef);
  };

  const editarTarefa = async (item) => {
    setTarefaInput(item.tarefa);
    setEditar(item);
  };

  const handleAtualizarTarefa = async () => {
    const refDoc = doc(db, "tarefas", editar?.id);
    await updateDoc(refDoc, {
      tarefa: tarefaInput,
    }).then(() => {
      setTarefaInput("");
      setEditar({});
      alert("tarefa editada com sucesso");
    }).catch(()=>{
      console.log("Erro ao editar tarefa");
      setTarefaInput("");
      setEditar({});
    })
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
        {/* Object.keys(editar).length > 0  / saber se o objeto está vazio*/}
        {Object.keys(editar).length > 0 ? (
          <button type="submit">Atualizar tarefa</button>
        ) : (
          <button type="submit">Registrar tarefa</button>
        )}
      </form>

      {tarefas.map((item) => (
        <article className="lista" key={item.id}>
          <p>{item.tarefa}</p>

          <div>
            <button onClick={() => editarTarefa(item)}>Editar</button>
            <button id="btn-concluir" onClick={() => deletarTarefa(item.id)}>
              Concluir
            </button>
          </div>
        </article>
      ))}
      <button id="sair" onClick={handleSair}>
        Sair
      </button>
    </div>
  );
}

export default Admin;
