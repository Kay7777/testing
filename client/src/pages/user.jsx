import React from "react";
import { Container, Button } from "@material-ui/core";
import axios from "axios";
import Post from "../components/forms/post";
import PostCard from "../assets/postcard";
import { connect } from "react-redux";

class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    };
  }

  componentDidMount = async () => {
    const allPosts = await axios.get("/api/post/get/user");
    await this.setState({ cards: allPosts.data });
    console.log(this.state);
  };

  renderCards = () => {
    const { cards } = this.state;
    return (
      <div className="row">
        {cards.map((card, index) => {
          return <PostCard key={index} card={card} />;
        })}
      </div>
    );
  };

  render() {
    const { cards, post } = this.state;
    const { currentUser } = this.props;
    return (
      <div>
        {currentUser ? (
          <div>
            <div className="jumbotron">
              <Container>
                <h1 className="display-5 text-monospace">
                  Welcome back {currentUser.username}{" "}
                </h1>
                <hr />
                {cards.length === 0 ? (
                  <p className="lead text-monospace">
                    You do not have any post yet, post one!
                  </p>
                ) : (
                  <p className="lead text-monospace">
                    Congratulation, you have {cards.length} posts now, continue
                    to post your wonderful life to the world!
                  </p>
                )}

                <Post />
              </Container>
            </div>
            <Container>
              {cards.length !== 0 ? this.renderCards() : null}
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

export default connect(mapStateToProps)(UserPage);
