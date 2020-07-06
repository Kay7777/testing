import CommentCard from "../../assets/commentcard";
import CommentForm from "./form";
import React from "react";
import { Container } from "@material-ui/core";
import { selectCurrentComments } from "../../selectors/comment";
import { createStructuredSelector } from "reselect";
import * as actions from "../../actions";
import { connect } from "react-redux";

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
    await this.props.SetCurrentComments(postId);
    this.setState({ comments: this.props.currentComments });
  };

  render() {
    const { comments, postId } = this.state;
    return (
      <Container>
        <CommentForm postId={postId} renderComments={this.componentDidMount} />
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

const mapStateToProps = createStructuredSelector({
  currentComments: selectCurrentComments,
});

export default connect(mapStateToProps, actions)(CommentPart);
