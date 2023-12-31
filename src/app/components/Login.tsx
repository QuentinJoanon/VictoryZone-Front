'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import '../dashboard/@login/login.scss';

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}api/auth/login`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        setSuccess(true);
        location.reload();
      })
      .catch((error) => {
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
      });
  }

  return (
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
  );
}
