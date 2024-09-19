'use client';
import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css"; 

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const handleOutsideClick = (event: MouseEvent) => {
    const sidebarElement = document.getElementById("sidebar");
    if (sidebarElement && !sidebarElement.contains(event.target as Node)) {
      onClose();
    }
  };

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

  return (
    <aside id="sidebar" className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.content}>
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
      </div>
    </aside>
  );
};

export default Sidebar;
