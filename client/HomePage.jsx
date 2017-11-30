import React, { Component } from 'react';

export default class HomePage extends Component {

  constructor() {
    super();
    this.state = {
      image: 'paris.jpg'
    };
    this.carousel;
  }

  componentDidMount(){
    const theHP = this;
    const images = ['paris.jpg', 'iceland.jpg', 'hiking.jpg', 'nyc.jpg'];
    let counter = 0;

    this.carousel = setInterval(() => {
      counter = (counter + 1) % (images.length);
      theHP.setState({
        image: images[counter]
      });
    }, 5000);
  }

  componentWillUnmount(){
    clearInterval(this.carousel)
  }

  render(){
    return (

      <div>
        <section id="carousel">
          <div id="carousel-text">
            <h1 className="hp-header"><strong>tripHub</strong></h1>
            <button className="btn login-btn black" onClick={this.props.login}>Log In</button>
          </div>
          <img className="carousel-image" src={this.state.image} />
        </section>
      </div>
    );
  }
}
