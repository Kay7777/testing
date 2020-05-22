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
    let structuredComments = [];
    let promises = [];
    const comments = await axios.get("/api/comment/get/" + postId);
    console.log(comments.data);
    await comments.data.forEach((comment) => {
      promises.push(
        axios.get("/api/user/get/" + comment.userId).then((res) => {
          const { username, photo } = res.data;
          const { content } = comment;
          structuredComments.push({ username, photo, content });
        })
      );
    });
    await Promise.all(promises).then(() =>
      this.setState({ comments: structuredComments })
    );
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
              photo={comment.photo}
              username={comment.username}
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
