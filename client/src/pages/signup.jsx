import React from "react";
import Alert from "@material-ui/lab/Alert";
import {
  CardContent,
  Typography,
  Button,
  TextField,
  Container,
  Snackbar,
} from "@material-ui/core";
import * as actions from "../actions";
import { connect } from "react-redux";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    username: "",
    error: false,
  };

  handleSignUp = async () => {
    const { email, password, username } = this.state;
    this.props.UserSignUp({ email, password, username }, (res) => {
      if (res.data.error) {
        this.setState({ error: true });
      } else {
        this.props.history.push("/signin");
      }
    });
  };

  render() {
    const { email, password, username, error } = this.state;
    return (
      <div style={{ position: "relative", top: 70 }}>
        <Container className="text-center">
          <CardContent>
            <Typography color="textSecondary" style={{ fontSize: 40 }}>
              PicsPie
            </Typography>
            <TextField
              id="standard-basic"
              label="Email"
              type="email"
              style={{ width: 300, marginTop: 10 }}
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Username"
              style={{ width: 300, marginTop: 10 }}
              value={username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Password"
              type="password"
              style={{ width: 300, marginTop: 10 }}
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{
                width: 300,
                marginTop: 10,
                backgroundColor: "#0F9D58",
              }}
              onClick={this.handleSignUp}
            >
              Sign Up
            </Button>
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{
                width: 300,
                marginTop: 10,
                backgroundColor: "#4285F4",
              }}
              href="/auth/google"
            >
              Google Account
            </Button>
          </CardContent>
        </Container>
        <Snackbar open={error} autoHideDuration={2000}>
          <Alert
            severity="error"
            onClose={() => this.setState({ error: false })}
          >
            This Email has been registed!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default connect(null, actions)(SignUp);
