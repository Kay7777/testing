import CommentCard from "../../assets/commentcard";
import CommentForm from "../forms/comment";
import React from "react";
import axios from "axios";
import { Container } from "@material-ui/core";

class CommentPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      postId: this.props.postId,
    };
  }

  componentDidMount = async () => {
    const { postId } = this.state;
    const comments = await axios.get("/api/comment/get/" + postId);
    console.log(comments.data);
    this.setState({ comments: comments.data });
  };

  render() {
    const { comments, postId } = this.state;
    return (
      <Container>
        <CommentForm postId={postId} />
        {comments.length !== 0 ? (
          comments.map((comment, index) => (
            <CommentCard
              key={index}
              content={comment.content}
              photo={comment.userPhoto}
              username={comment.userName}
            />
          ))
        ) : (
          <process />
        )}
      </Container>
    );
  }
}

export default CommentPart;
