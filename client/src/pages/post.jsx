import React from "react";
import axios from "axios";
import { Container, Button } from "@material-ui/core";
import CommentPart from "../components/comment/main";
import { connect } from "react-redux";

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: this.props.match.params.id,
      userInfor: null,
      postInfor: null,
    };
  }

  componentDidMount = async () => {
    const { postId } = this.state;
    const postInfor = await axios.get("/api/post/get/" + postId);
    const { userId } = postInfor.data;
    const userInfor = await axios.get("/api/user/get/" + userId);
    await this.setState({
      userInfor: userInfor.data,
      postInfor: postInfor.data,
    });
  };

  handleDelete = async () => {
    const { postId } = this.state;
    await axios.post("/api/post/delete/" + postId);
    window.location = "/user";
  };

  render() {
    const { postInfor, userInfor, postId } = this.state;
    const { currentUser } = this.props;
    return (
      <div>
        {postInfor && userInfor ? (
          <div>
            <div class="jumbotron">
              <h3 className="text-monospace">{postInfor.title}</h3>
              <hr />
              <h5 className="text-monospace">
                ---- post by {userInfor.username}
              </h5>
              {postInfor.userId === currentUser._id ? (
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
                    src={
                      "https://fullstackproject.s3.ca-central-1.amazonaws.com/" +
                      postInfor.images[0]
                    }
                    class="img-fluid"
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
