import React from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/actions.js";
import Header from "./components/partials/header";
import Bottom from "./components/partials/bottom";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import MainPage from "./pages/main";
import UserPage from "./pages/user";
import PostPage from "./pages/post";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = async () => {
    const doc = await axios.get("/auth/current_user");
    this.props.setCurrentUser(doc.data);
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={MainPage} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/user" component={UserPage} />
          <Route path="/post/:id" component={PostPage} />
          <Bottom />
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
