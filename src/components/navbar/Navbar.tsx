
'use client';
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Sidebar from "../Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons"; // faBars para el menú
import useMedia from 'use-media';

const Navbar: React.FC = () => {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isMobile = useMedia({ maxWidth: '768px' });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setFirstName(userData.firstName || null);
    }
  }, []);

  return (
    <>
    <nav className={styles.navbar}>
      <button  onClick={toggleSidebar} className={styles.menuButton}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={styles.icon}></div> {/* Centrado en pantallas pequeñas */}
      <div className={styles.logoAndLinks}>
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
    {isMobile && (
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          )}
    </>
    
     
  );
};

export default Navbar;
