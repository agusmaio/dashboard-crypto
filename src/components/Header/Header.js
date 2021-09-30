import React from "react";
import PropTypes from "prop-types";

const Header = ({ entry }) => {
  return (
    <header>
      <p>
        Bienvenido, {entry.name} {entry.lastName}
      </p>
    </header>
  );
};

Header.propTypes = {};

export default Header;
