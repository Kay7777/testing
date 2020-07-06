import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../selectors/user";
import * as actions from "../../actions";

const Header = (props) => {
  const renderHeader = () => {
    console.log(props);
    switch (props.currentUser) {
      case null:
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
              <a
                className="nav-link"
                style={{
                  cursor: "pointer",
                }}
                onClick={() =>
                  props.UserLogOut((res) => {
                    if (res && res.data.message === "SignOut successfully")
                      window.location = "/signin";
                  })
                }
              >
                Log Out
              </a>
            </li>
          </ul>
        );
    }
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, actions)(Header);
