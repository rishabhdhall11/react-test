import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "../components/Header";
import Contact from "./contact";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="ui container">
      <Router>
        <Header />
        <div className="main" >
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/contacts">Users</Link>
            </li>
          </ul>
        </nav>
        </div>
        <Switch>
          <Route
            path="/contacts"
            render={(props) => <Contact {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
