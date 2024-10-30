"use client";
import { useAppSelector } from "@/store";
import { login } from "@/store/features/authSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { isAuth, mail: mailRedux } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;
  const fetchRegister = async () => {
    if (!password) return alert("Completar campo password");
    if (!mail) return alert("Completar campo mail");

    try {
      const register = await axios.post(`${backendUrl}/auth/login`, {
        mail: mail,
        password: password,
      });
      // Guardar el correo en localStorage
      dispatch(login(mail));
      //localStorage.setItem("userEmail", mail);
      router.push("/");
      console.log(register.data);
    } catch (error: any) {
      if (error.response.data === "El correo esta repetido") {
        alert(error.response.data);
      }
      console.log(error.response.data);
    }
  };

  return (
    <section>
      <div className="inputConfig">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          type="email"
          placeholder="ingrese email"
        />
      </div>

      <div className="inputConfig">
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="ingrese contraseña"
        />
      </div>

      <button onClick={fetchRegister}>Iniciar sesion</button>
      <Link href={"/register"} className="register">
        ¿No tenes cuenta? <span>Registrate</span>
      </Link>
    </section>
  );
};

export default Login;
