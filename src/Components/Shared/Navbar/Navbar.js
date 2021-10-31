import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';

import firebaseInitialize from '../../../firebaseInitialize';
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
    // firebase initialization
    firebaseInitialize();
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const logOutHandler = () => {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            setLoggedUser({});
            localStorage.removeItem("loginUser");
          })
          .catch((error) => {
            // An error happened.
          });
      };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <Link className="navbar-brand" to="/">Sajek Courier Service</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/my-orders">My Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/manage-all-orders">Manage All Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-a-new-service">Add A New Service</Link>
                        </li>
                    </ul>
                    <div>
                        {
                            loggedUser.email? <Link to="/login" className="btn btn-primary">Login</Link>: <button onClick={()=> logOutHandler} className="btn btn-danger">Logout</button>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;