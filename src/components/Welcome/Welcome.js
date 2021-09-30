import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

const Welcome = ({ navigateToDashboard }) => {
  const history = useHistory();

  const nameRef = useRef();
  const lastNameRef = useRef();

  const handleForm = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const lastName = lastNameRef.current.value;

    navigateToDashboard(name, lastName, history);
  };

  return (
    <div className="welcome-container">
      <form onSubmit={handleForm}>
        <h1>Bienvenido a Crypto</h1>

        <label>Nombre</label>
        <input ref={nameRef} type="text"></input>

        <label>Apellido</label>
        <input ref={lastNameRef} type="text"></input>

        <button>Ingresar</button>
      </form>
    </div>
  );
};

Welcome.propTypes = {};

export default Welcome;
