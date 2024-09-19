import React from "react";
import Banner from "../components/banner/Banner";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./layout.module.css";

export const metadata = {
  title: "Cinema",
  description: "Aplicación para buscar y ver películas",
};


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="es" className={styles.bodyhtml}>
      <body className={styles.body}>
        <header className={styles.navbar}>
          <Navbar />
        </header>
        <div className={styles.mainContainer}>
          <Banner className={styles.banner} />
          <div className={styles.content}>
            <Sidebar className={styles.sidebar} />
            <main className={styles.contentMain}>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
