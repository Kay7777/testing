import React from "react";
import { TextField, Button, Container, Typography } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      postId: this.props.postId,
      content: "",
    };
  }

  postComment = async () => {
    const { title, content, postId } = this.state;
    const infor = await axios.post("/api/comment/create/" + postId, {
      content,
    });
    if (!infor.data.err) window.location = "/post/" + postId;
  };

  render() {
    const { content } = this.state;
    const { currentUser } = this.props;
    return (
      <div>
        <Container style={{ paddingTop: 10 }}>
          <TextField
            id="standard-multiline-static"
            label="Comment"
            multiline
            value={content}
            rows={2}
            style={{ width: 300 }}
            onChange={(e) => this.setState({ content: e.target.value })}
          />
          {currentUser ? (
            <Button
              color="primary"
              variant="contained"
              style={{
                marginTop: 10,
                marginBottom: 20,
                backgroundColor: "#4285F4",
              }}
              onClick={this.postComment}
            >
              Post
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              style={{
                marginTop: 10,
                width: 250,
                marginBottom: 20,
                backgroundColor: "#4285F4",
              }}
            >
              Need login to comment
            </Button>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(CommentForm);
