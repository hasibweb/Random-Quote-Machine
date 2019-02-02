import React, { Component } from 'react';
import './App.css';
import Loading from './layout/Loading';
import { Fade } from 'reactstrap'

class App extends Component {
  state = {
    quotes: [],
    random: {},
    API: "https://gist.githubusercontent.com/hasibweb/68e359a2e63d071fbd893596391b9ddd/raw/c34d04ef3e0d6283d90b311a768c39a12cf2ac64/quotes.json",
    colors: ['primary', 'secondary', 'success', 'danger', 'info', 'dark'],
    active: 2
  }

  // Component Did Mount
  componentDidMount() {
    fetch(this.state.API)
      .then(response => response.json())
      .then((quotes) => {
        // All Quotes
        this.setState({ quotes });

        // Random Quote
        this.randomQuoteGenerator(quotes);
      })
      .catch(err => console.log(err));
  }

  // Random Quote Generator
  randomQuoteGenerator = (quotes) => {
    const randomID = Math.floor(Math.random() * quotes.length);
    if (randomID) {
      const randomquote = [...quotes.filter(quote => quote.id === randomID)][0];
      this.setState({ random: randomquote })
    }
  }

  // New Quote
  handleNewQuote = () => {
    this.randomQuoteGenerator(this.state.quotes);
    this.handleActiveColor();
  }

  // handle Active Color
  handleActiveColor = () => {
    const { colors, active } = this.state;

    if (active === (colors.length - 1)) this.setState({ active: 0 })
    else this.setState(prevState => ({ active: prevState.active + 1 }))
  }

  render() {
    const { quotes, random: { id, quote, author }, colors, active } = this.state;
    const activeColor = colors[active];
    // Render Quote
    const renderQuote = (
      <div key={id} className="" id="quote-box">
        <Fade in={true} tag="div">
          <p id="text" className={`font-weight-bold font-italic text-center lead text-${activeColor}`}>
            <i className="fas fa-quote-left"></i> {quote} <i className="fas fa-quote-right"></i></p>
          <h5 id="author" className={`text-right mb-4 text-${activeColor}`}>-{author}</h5>
        </Fade>
        <div className="social-icons float-left mt-2">
          <a
            id="tweet-quote"
            className={`py-2 px-3 bg-${activeColor} text-white mr-1`}
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${
              encodeURIComponent('"' + quote + '" ' + author)}`
            }>
            <i className="fab fa-1x fa-twitter"></i>
          </a>
        </div>
        <button id="new-quote" className={`btn btn-${activeColor} float-right`} onClick={this.handleNewQuote}>New Quote</button>
      </div>
    );

    return (
      <div className={`App bg-${activeColor}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto mt-5 jumbotron" style={{ minHeight: '200px' }}>
              {quotes.length ? renderQuote : <Loading color={activeColor} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;