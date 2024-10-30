"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const [mail, setMail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;
  const fetchRegister = async () => {
    if (!password) return alert("Completar campo password");
    if (!repeatPassword) return alert("Completar campo password");
    if (!mail) return alert("Completar campo mail");
    if (!username) return alert("Completar campo username");
    if (password !== repeatPassword)
      return alert("Las contraseñas no coinciden");
    try {
      const register = await axios.post(`${backendUrl}/auth/register`, {
        mail: mail,
        username: username,
        password: password,
      });
      console.log(register.data);
      router.push("/login");
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
        <label htmlFor="username">Username</label>

        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="ingrese username"
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
      <div className="inputConfig">
        <label htmlFor="email">Repita contraseña</label>
        <input
          id="email"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          type="text"
          placeholder="repita contraseña"
        />
      </div>
      <button onClick={fetchRegister}>Registrarse</button>
    </section>
  );
};

export default Register;
