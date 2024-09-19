
import React from "react";
import styles from "./Sidebar.module.css"; 

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
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
