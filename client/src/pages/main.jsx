import React from "react";
import { Container, Button } from "@material-ui/core";
import axios from "axios";
import Post from "../components/forms/post";
import PostCard from "../assets/postcard";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: null,
    };
  }

  componentDidMount = async () => {
    const allPosts = await axios.get("/api/post/get/all");
    await this.setState({ cards: allPosts.data });
    console.log(this.state);
  };

  renderCards = () => {
    const { cards } = this.state;
    return (
      <div className="row">
        {cards.map((card, index) => {
          return (
            <PostCard
              key={index}
              title={card.title}
              content={card.content}
              id={card._id}
              image={
                "https://fullstackproject.s3.ca-central-1.amazonaws.com/" +
                card.images[0]
              }
            />
          );
        })}
      </div>
    );
  };

  render() {
    const { cards, post } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <Container>
            <h1 className="text-monospace display-5">Welcome to PicsPie</h1>
            <hr />
            <p className="lead text-monospace">
              PicsPie is a social media web application for people to share
              their life!
            </p>
            <Post />
          </Container>
        </div>
        <Container>{cards ? this.renderCards() : null}</Container>
      </div>
    );
  }
}

export default MainPage;
