import { useState, useEffect } from "react";
import { auth } from "../firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

function Private({children}) {

    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(()=>{
        const checarLogin = async()=>{
            const logado = onAuthStateChanged(auth, (user)=>{
                //se tem gente logada
                if(user){
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    };

                    localStorage.setItem('@datalhesUsuario', JSON.stringify(userData));

                    setLoading(false);
                    setSigned(true);

                }else{
                    setLoading(false)
                    setSigned(false)
                }
            })
        }

        checarLogin();
    },[]);

    if(loading){
        return (
            <div></div>
        )
    }

    if(!signed){
        return (<Navigate to={'/'}/>)
    }

  return children;
}

export default Private