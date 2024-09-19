/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../utils/api";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleOutsideClick = (event: MouseEvent) => {
    const sidebarElement = document.getElementById("sidebar");
    if (sidebarElement && !sidebarElement.contains(event.target as Node)) {
      onClose?.();
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      const userData = JSON.parse(user);
      setFirstName(userData.firstName || null);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setFirstName(null);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      alert("Sesión cerrada correctamente.");
      window.location.reload();
    } catch (error) {
      console.error("Error durante el logout:", error);
      alert("Hubo un problema al cerrar sesión.");
    }
  };

  return (
    <aside
      id="sidebar"
      className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
    >
      <div className={styles.content}>
        {isAuthenticated ? (
          <>
            <div className={styles.title}>
              <label>Hola, {firstName}</label>
            </div>
            <div className={styles.title}>
              <label>Search</label>
            </div>
            <div>
              <input className={styles.input} type="text" placeholder="Keywords" />
            </div>
            <div className={styles.title}>
              <label>Genres</label>
            </div>
            <div>
              <select className={styles.genreSelect}>
                <option value="action">Action</option>
                <option value="adventure">Adventure</option>
                <option value="animation">Animation</option>
                <option value="comedy">Comedy</option>
                <option value="crime">Crime</option>
                <option value="documentary">Documentary</option>
                <option value="drama">Drama</option>
                <option value="family">Family</option>
                <option value="fantasy">Fantasy</option>
                <option value="history">History</option>
                <option value="horror">Horror</option>
                <option value="music">Music</option>
                <option value="mystery">Mystery</option>
                <option value="romance">Romance</option>
                <option value="sciencefiction">Science Fiction</option>
                <option value="thriller">Thriller</option>
                <option value="war">War</option>
                <option value="western">Western</option>
                <option value="tvmovie">TV Movie</option>
                <option value="biography">Biography</option>
              </select>
            </div>
            <div className={styles.options}>
              <label className={styles.title}>Options</label>
              <div>
                <button className={styles.button}>Ver todos los usuarios</button>
              </div>
              <div>
                <button className={styles.button}>Encontrar usuario por ID</button>
              </div>
              <div>
                <button className={styles.button}>Actualizar usuario</button>
              </div>
              <div>
                <button className={styles.button}>Borrar usuario</button>
              </div>
              <div>
                <button className={styles.button} onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.title}>
            <label>Please log in to access the sidebar options.</label>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
