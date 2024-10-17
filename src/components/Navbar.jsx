import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css'; // Import your CSS file

const Navbar = () => {
  return (
    <nav className="navbarr  ">
		<Link className="navbar-brand "  to="/">Shopping</Link>

    <Link className="btn btn-outline-success" to="/create">
  + Create 🛒
</Link>
        <Link className="btn btn-outline-light"  to="/">

    All Products 🛒

</Link>

    </nav>
  );
};

export default Navbar;
