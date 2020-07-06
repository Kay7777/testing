import React from "react";
import { Container, Button } from "@material-ui/core";
import Post from "../components/post/form";
import PostCard from "../assets/postcard";
import { connect } from "react-redux";
import { selectUserPosts } from "../selectors/post";
import { selectCurrentUser } from "../selectors/user";
import { createStructuredSelector } from "reselect";
import * as actions from "../actions";

class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    };
  }

  componentDidMount = async () => {
    await this.props.SetUserPosts();
    this.setState({ cards: this.props.userPosts });
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

const mapStateToProps = createStructuredSelector({
  userPosts: selectUserPosts,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, actions)(UserPage);
