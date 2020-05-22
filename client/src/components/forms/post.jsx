import {
  TextField,
  Button,
  Container,
  Paper,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import axios from "axios";
import PostCard from "../../assets/fakepostcard";
import { connect } from "react-redux";
import keys from "../../assets/keys";

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      images: "",
      videos: [],
      postShow: false,
      posting: false,
      imageDone: false,
    };
  }

  // TODO: upload multiple images
  // handleAddImage = async (e) => {
  //   const { images } = this.state;
  //   const newImages = images.push(e.target.files[0]);
  //   this.setState({ images: newImages });
  // };

  handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const uploadConfig = await axios.get("/api/image/upload");
    await axios
      .put(uploadConfig.data.url, file, {
        headers: {
          "Content-type": file.type,
        },
      })
      .catch((err) => console.log(err));
    console.log(uploadConfig.data.key);
    this.setState({
      images: uploadConfig.data.key,
      imageDone: true,
    });
  };

  handlePost = async () => {
    const { images, title, content, videos } = this.state;
    await this.setState({ posting: true });
    const post = await axios.post("/api/post/create", {
      title,
      content,
      images,
      videos,
    });
    window.location = "/user";
  };

  showPostForm = () => {
    const { title, content, images, imageDone } = this.state;
    return (
      <Paper>
        <Container style={{ paddingTop: 10 }}>
          <TextField
            id="standard-basic"
            label="Title"
            value={title}
            style={{ width: 200, marginBottom: 10 }}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <br />
          <TextField
            id="standard-multiline-static"
            label="Content"
            multiline
            value={content}
            rows={10}
            style={{ width: 500, marginBottom: 10 }}
            onChange={(e) => this.setState({ content: e.target.value })}
          />
          <br />
          <div>
            Add Images:{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => this.handleUploadImage(e)}
            />
            {/* {images.length} / 3 */}
          </div>

          <br />
          {imageDone ? (
            <Button
              variant="contained"
              color="primary"
              style={{
                marginTop: 10,
                width: 200,
                marginBottom: 20,
                backgroundColor: "#4285F4",
              }}
              onClick={this.handlePost}
            >
              Confirm
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              disabled="true"
              style={{
                marginTop: 10,
                width: 200,
                marginBottom: 20,
                backgroundColor: "#4285F4",
              }}
              onClick={this.handlePost}
            >
              Confirm
            </Button>
          )}
        </Container>
      </Paper>
    );
  };

  render() {
    const { title, content, images, postShow, posting, alert } = this.state;
    const { currentUser } = this.props;
    return (
      <div style={{ marginBottom: 10 }}>
        {postShow ? (
          posting ? (
            <div>
              Posting now, please wait ... <process />
            </div>
          ) : (
            <div>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  width: 150,
                  marginTop: 10,
                }}
                onClick={() => this.setState({ postShow: !postShow })}
              >
                Close
              </Button>
              <div className="row">
                {this.showPostForm()}
                <PostCard
                  title={title}
                  content={content}
                  image={images}
                  user={currentUser}
                />
              </div>
            </div>
          )
        ) : currentUser ? (
          <Button
            variant="contained"
            color="primary"
            style={{
              width: 150,
              marginTop: 10,
              backgroundColor: "#4285F4",
            }}
            onClick={() => this.setState({ postShow: !postShow })}
          >
            Post
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            style={{
              width: 200,
              marginTop: 10,
              backgroundColor: "#4285F4",
            }}
          >
            Need login to post
          </Button>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Post);
