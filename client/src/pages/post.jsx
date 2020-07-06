import React from "react";
import { Container, Button } from "@material-ui/core";
import CommentPart from "../components/comment/main";
import { connect } from "react-redux";
import { selectCurrentUser } from "../selectors/user";
import { selectCurrentPost } from "../selectors/post";
import { createStructuredSelector } from "reselect";
import * as actions from "../actions";
import keys from "../assets/keys";

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: this.props.match.params.id,
      postInfor: null,
    };
  }

  componentDidMount = async () => {
    const { postId } = this.state;
    await this.props.SetCurrentPost(postId);
    this.setState({ postInfor: this.props.currentPost });
  };

  handleDelete = async () => {
    const { postId } = this.state;
    await this.props.DeleteUserPost(postId, () => {
      this.props.history.push("/user");
    });
  };

  render() {
    const { postInfor, postId } = this.state;
    const { currentUser } = this.props;
    return (
      <div style={{ marginBottom: 50 }}>
        {postInfor ? (
          <div>
            <div className="jumbotron">
              <h3 className="text-monospace">{postInfor.title}</h3>
              <hr />
              <h5 className="text-monospace">
                ---- post by {postInfor.userName}
              </h5>
              {currentUser && postInfor.userId === currentUser._id ? (
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={this.handleDelete}
                >
                  Delete
                </Button>
              ) : null}
            </div>
            <Container>
              <div className="row">
                <div className="col-md-8">
                  <img
                    src={keys.AWS_S3 + postInfor.images[0]}
                    className="img-fluid"
                    alt="Responsive image"
                  />
                </div>
                <div className="col-md-4" style={{ marginTop: 20 }}>
                  <p className="text-monospace">{postInfor.content}</p>
                </div>
                <CommentPart postId={postId} />
              </div>
            </Container>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentPost: selectCurrentPost,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, actions)(PostPage);
