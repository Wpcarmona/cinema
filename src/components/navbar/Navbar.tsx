'use client';
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {

  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    // Obtener el nombre del usuario (firstName) desde el localStorage
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setFirstName(userData.firstName || null);
    }
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoAndLinks}>
        <div className={styles.contentTitle}>
          <div className={styles.icon}></div>
        </div>
        <span className={styles.link}>Popular</span>
        <span className={styles.link}>Favorites</span>
      </div>
      <div className={styles.userIcon}>
        {firstName ? (
          <div>
              <span className={styles.greeting}>Hola, {firstName}</span>
              <FontAwesomeIcon icon={faUser} />
          </div>
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
