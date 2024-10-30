"use client";

import React, { useEffect, useState } from "react";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { CiLogout, CiLogin } from "react-icons/ci";
import Link from "next/link";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/authSlice";
import { useParams, usePathname } from "next/navigation";
import { FaUserLock } from "react-icons/fa";

const Navbar = () => {
  const [login, setLogin] = useState<boolean>(false);
  const dispatch = useDispatch();
  const params = usePathname();

  //console.log(params);
  const { isAuth, mail: mailRedux } = useAppSelector((state) => state.auth);

  useEffect(() => {
    //console.log("Sd");
  }, [isAuth]);

  return (
    <nav>
      <Link href={"/"} className="logo">
        <span>Ivancho</span> <CiLogin size={25} />
      </Link>
      <ul>
        <li>
          <Link href={"/offer"}>Codigos Promocionales</Link>
        </li>
        <span className="mx-1">|</span>
        <li>
          {params == "/login" || params == "/register" ? (
            <div className="loginUser">
              {/* <h4>Login User</h4> */}
              <FaUserLock size={25} />
            </div>
          ) : (
            <>
              {isAuth ? (
                <Link
                  href="/"
                  onClick={() => dispatch(logout())}
                  className="flex"
                >
                  <p>Cerrar sesion</p>
                  <CiLogout size={25} />
                </Link>
              ) : (
                <Link href="/login" className="flex">
                  <p>Iniciar sesion</p>
                  <CiLogin size={25} />
                </Link>
              )}
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
