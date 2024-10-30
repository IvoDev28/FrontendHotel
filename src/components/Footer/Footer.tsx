import React from "react";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <p>© Iván Lucana | Todos los derechos reservados.</p>
      <div>
        <FaGithub size={25} />
        <FaLinkedin size={25} />
        <FaDiscord size={25} />
      </div>
    </footer>
  );
};

export default Footer;
