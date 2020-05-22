import React from "react";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Container,
  Snackbar,
} from "@material-ui/core";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    username: "",
    error: false,
  };

  handleSignUp = async () => {
    const { email, password, username } = this.state;
    const doc = await axios.post("/api/user/signup", {
      email,
      password,
      username,
    });
    // TODO: pop up
    if (doc.data.error) {
      this.setState({ error: true });
    }
  };

  render() {
    const { email, password, username, error } = this.state;
    return (
      <div className="position">
        <Container className="text-center col-sm-8 col-md-6 col-lg-5 col-xl-5">
          <Card variant="outlined">
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
          </Card>
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

export default SignUp;
