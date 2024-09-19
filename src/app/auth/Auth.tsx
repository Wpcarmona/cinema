"use client";

import React, { useState } from "react";
import styles from "./Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { login, createUser } from "../../utils/api";

interface AuthProps {
  onAuthSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isRegister, setIsRegister] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleToggle = () => {
    setIsRegister(!isRegister);
  };

  const handleClose = () => {
    console.log("Cerrar modal");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      let response;
      if (isRegister) {
        const name = formData.get("name") as string;
        const phone = formData.get("phone") as string;

        response = await createUser({ name, email, password, phone });
      } else {
        response = await login(email, password);
      }

      localStorage.setItem("token", response.header[0].token);
      localStorage.setItem("user", JSON.stringify(response.body[0]));
      onAuthSuccess();
      window.location.reload();
    } catch (error) {
      console.error("Error during authentication:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.closeButtonContainer}>
        <button className={styles.closeButton} onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} /> Cerrar
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.formContainer}>
          <div className={styles.buttons}>
            <button
              className={`${styles.button} ${isRegister ? styles.active : ""}`}
              onClick={handleToggle}
            >
              Register
            </button>
            <button
              className={`${styles.button} ${!isRegister ? styles.active : ""}`}
              onClick={handleToggle}
            >
              Login
            </button>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            {isRegister ? (
              <>
                <h2>Register</h2>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                />
                <input
                  className={styles.input}
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  required
                />
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <button
                  type="submit"
                  className={styles.buttonAuth}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Register with email"}
                </button>
              </>
            ) : (
              <>
                <h2 className={styles.titleAuth}>We love having you back</h2>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <button
                  type="submit"
                  className={styles.buttonAuth}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Continue"}
                </button>
              </>
            )}
          </form>
        </div>
        {isRegister ? (
          <div className={styles.infoContainer}>
            <div className={styles.infoText}>
              <h2>Welcome to Quickbet Movies!</h2>
              <p>
                🎬 Ready to unlock a universe of cinematic delights? Sign up now
                and start your journey with us!
              </p>
            </div>
            <div className={styles.imageRegister} />
          </div>
        ) : (
          <div className={styles.infoContainer}>
            <div className={styles.infoText}>
              <h2>Welcome back to Quickbet Movies!</h2>
              <p>
                🍿 Ready to dive into the world of unlimited entertainment?
                Enter your credentials and let the cinematic adventure begin!
              </p>
            </div>
            <div className={styles.imageLogin} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
