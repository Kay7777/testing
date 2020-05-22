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
          <ul className="navbar-nav">
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
          </ul>
        );

      default:
        return (
          <ul className="navbar-nav">
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
          </ul>
        );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        PicsPie
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#righttags"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="righttags">
        <ul className="navbar-nav mr-auto"></ul>
        {renderHeader()}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
