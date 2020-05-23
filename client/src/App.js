import React, { lazy, Suspense } from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/actions.js";
import ErrorBoundary from "./components/error/errorboundary";
import Header from "./components/partials/header";
import Footer from "./components/partials/footer";
const MainPage = lazy(() => import("./pages/main"));
const PostPage = lazy(() => import("./pages/post"));
const UserPage = lazy(() => import("./pages/user"));
const SignIn = lazy(() => import("./pages/signin"));
const SignUp = lazy(() => import("./pages/signup"));

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
          <ErrorBoundary>
            <Suspense fallback={null}>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/user" component={UserPage} />
              <Route path="/post/:id" component={PostPage} />
            </Suspense>
          </ErrorBoundary>

          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
