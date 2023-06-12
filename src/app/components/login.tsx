import React, { useState, useEffect, useRef } from 'react';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('isAdmin', 'true');
    console.log(email, password);
    setEmail('');
    setPassword('');
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Vous êtes connecté !</h1>
        </section>
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
