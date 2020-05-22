import React from "react";
import { connect } from "react-redux";

const Header = (props) => {
  const renderHeader = () => {
    const { currentUser } = props;
    switch (currentUser) {
      case null:
        return;
      case false:
        return (
          <div className="row">
            <li className="nav-item ">
              <a className="nav-link" href="/signin">
                Sign In
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/signup">
                Sign Up
              </a>
            </li>
          </div>
        );

      default:
        return (
          <div className="row">
            <li className="nav-item ">
              <a className="nav-link" href="/user">
                My Posts
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/auth/logout">
                Log Out
              </a>
            </li>
          </div>
        );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        PicsPie
      </a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto"></ul>
        <ul className="navbar-nav">{renderHeader()}</ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
