import React from "react";
import { Container } from "@material-ui/core";
import Post from "../components/forms/post";
import PostCard from "../assets/postcard";
import { connect } from "react-redux";
import { selectAllPosts } from "../selectors/post";
import { createStructuredSelector } from "reselect";
import * as actions from "../actions";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  componentDidMount = async () => {
    await this.props.SetAllPosts();
    this.setState({ cards: this.props.allPosts });
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
    const { cards } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <Container>
            <h1 className="text-monospace display-5">Welcome to PicsPie</h1>
            <hr />
            <p className="lead text-monospace">
              PicsPie is a social media application for people to share their
              life!
            </p>
            <Post />
          </Container>
        </div>
        <Container>{cards.length !== 0 ? this.renderCards() : null}</Container>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  allPosts: selectAllPosts,
});

export default connect(mapStateToProps, actions)(MainPage);
