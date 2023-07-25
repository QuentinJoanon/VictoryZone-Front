'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './index.scss';
export default function Contact() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copy, setCopy] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [classState, setClassState] = useState('hidden spinner');
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, first_name, last_name, subject, message, copy]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setClassState('spinner');
    e.preventDefault();
    console.log(email, first_name, last_name, subject, message, copy);
    axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}api/contact`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        first_name,
        last_name,
        subject,
        message,
        copy,
      },
    })
      .then((response) => {
        console.log(response);
        setSuccess(true);
        setClassState('hidden spinner');
      })
      .catch((error) => {
        if (!error?.response) {
          setErrMsg('Le serveur ne répond pas');
        }
        errRef.current!.focus();
      });
  }
  return (
    <main>
      <h1>Formulaire de contact</h1>
      <div className="contact">
        <p
          ref={errRef}
          className={errMsg ? 'errmsg' : 'offscreen'}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        {success ? <p>Méssage envoyé avec success</p> : ''}
        <form className="contact__form" onSubmit={handleSubmit}>
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

          <label htmlFor="first_name">Prénom</label>
          <input
            id="first_name"
            ref={userRef}
            autoComplete="off"
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label htmlFor="last_name">Nom</label>
          <input
            id="last_name"
            ref={userRef}
            autoComplete="off"
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label htmlFor="subject">Sujet</label>
          <input
            id="subject"
            ref={userRef}
            autoComplete="off"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <label htmlFor="message">Méssage</label>
          <textarea
            id="message"
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <label htmlFor="copy">recevoir une copie</label>
          <input
            id="copy"
            ref={userRef}
            autoComplete="off"
            type="checkbox"
            onChange={(e) => setCopy(!copy)}
          />

          <button type="submit" className="contact__button">
            Envoyer
          </button>
        </form>
        <div className={classState}></div>
      </div>
    </main>
  );
}
