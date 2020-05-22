import React from "react";
import axios from "axios";
import { Container, Button } from "@material-ui/core";
import CommentPart from "../components/comment/main";
import { connect } from "react-redux";
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
    const postInfor = await axios.get("/api/post/get/" + postId);
    await this.setState({
      postInfor: postInfor.data,
    });
  };

  handleDelete = async () => {
    const { postId } = this.state;
    await axios.post("/api/post/delete/" + postId);
    window.location = "/user";
  };

  render() {
    const { postInfor, postId } = this.state;
    const { currentUser } = this.props;
    return (
      <div>
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
                <div className="col-8">
                  <img
                    src={keys.AWS_S3 + postInfor.images[0]}
                    className="img-fluid"
                    alt="Responsive image"
                  />

                  <CommentPart postId={postId} />
                </div>
                <div className="col-4">
                  <p className="text-monospace">{postInfor.content}</p>
                </div>
              </div>
            </Container>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PostPage);
