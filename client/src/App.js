import { BrowserRouter, Route } from "react-router-dom";
import ErrorBoundary from "./components/error/errorboundary";
import Header from "./components/partials/header";
import Footer from "./components/partials/footer";
import React, { lazy, Suspense } from "react";
const MainPage = lazy(() => import("./pages/main"));
const PostPage = lazy(() => import("./pages/post"));
const UserPage = lazy(() => import("./pages/user"));
const SignIn = lazy(() => import("./pages/signin"));
const SignUp = lazy(() => import("./pages/signup"));
const GetCurrentUser = lazy(() => import("./pages/get-current-user"));

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = async () => {};

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <ErrorBoundary>
            <Suspense fallback={<div>Loading ...</div>}>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/user" component={UserPage} />
              <Route path="/post/:id" component={PostPage} />
              <Route
                exact
                path="/get_current_user"
                component={GetCurrentUser}
              />
            </Suspense>
          </ErrorBoundary>

          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
