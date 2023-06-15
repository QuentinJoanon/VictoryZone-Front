'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import DashboardMenu from './DashboardMenu';
import '../dashboard/@login/login.scss';

const API_URL =
  'https://projet-14-victory-zone-back-production.up.railway.app/';

export default function Login() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}api/auth/login`, {
        email: email,
        password: password,
      });
      if (response.data.data.permission_level === 1) {
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
      }
      setSuccess(true);
    } catch (error: AxiosError | any) {
      if (!error?.response) {
        setErrMsg('Le serveur ne répond pas');
      } else if (error.response?.status === 400) {
        setErrMsg('Email ou mot de passe incorrect');
      } else if (error.response?.status === 401) {
        setErrMsg('Email ou mot de passe incorrect');
      } else {
        setErrMsg('Email ou mot de passe incorrect');
      }
      errRef.current!.focus();
    }
  }

  return (
    <>
      {success ? (
        <DashboardMenu />
      ) : (
        <div className="login">
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Veuillez vous connecter</h1>
          <form className="login__form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              ref={userRef}
              autoComplete="off"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login__button">
              Connexion
            </button>
          </form>
        </div>
      )}
    </>
  );
}
