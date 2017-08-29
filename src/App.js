import React, {
  Component
} from 'react';
import './App.css';
import Feed from './components/feed'
import Loader from './components/loader'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomFeed: [],
      feed: [],
      loader: <Loader/> ,
      selection: 'techradar',
      clickCounter: -1
    }
    this.randomizer = this.randomizer.bind(this);
    this.selectSource = this.selectSource.bind(this);

  }

  randomizer() {
    // We want to render a set of six random news headlines from the API data.
    // We can simply use Math.floor() to create a random set of healines, but
    // one side effect is that we get duplicates. Therefore, we use the method below to
    // remove duplicates.

    let newsFeed = this.state.feed;
    let tmp = newsFeed.slice(newsFeed);
    let randomArray = [];
    // We use a for loop to iterate over the length of the array six time.
    // Then we grab a random news headline in each iteration, removing duplicates.
    for (let i = 0; i < 6; i++) {
      let index = Math.floor(Math.random() * tmp.length);
      let removed = tmp.splice(index, 1);
      // Since we are only removing one element
      randomArray.push(removed[0]);
    }
    // Set state. When the button is clicked, set the state for randomFeed and the loader.
    this.setState({
      randomFeed: randomArray,
      loader: '',
      clickCounter: this.state.clickCounter + 1
    })
  }


  componentDidMount() {
    this.fetchArticles(this.state.selection)
  }

  fetchArticles(theSource) {
    this.setState({ loader: <Loader />, randomFeed: [] })
    // Set your API URL with the API key.
    let url = `https://newsapi.org/v1/articles?source=${theSource}&apiKey=af600df07b854784ac69cb6ac797d62d`
    // We use regex to extra website name.
    let extract = url.match(/source= *(.*?)\s*&/).pop();
    // We set site name to state.
    this.setState({
      site: extract
    })
    // Fetch data from API
    fetch(url).then((response) => {
      return response.json()
    }).then((data) => {
      let articles = data.articles;
      this.setState({
        feed: articles
      }, this.randomizer)

    })
  }

  selectSource(event) {
    this.setState({
      selection: event.target.value,
    });
    this.fetchArticles(event.target.value)
  }

  render() {
    return ( <div className="App row">
              <div className="col-md-12 hd">
                <h1 className="hd-title"> {this.state.selection} < /h1>
                <h2 className="hd-sub"> News Randomizer </h2>
                <select onChange={this.selectSource}>
                  <option value="the-next-web"> The Next Web </option>
                  <option value="techradar"> TechRadar </option>
                  <option value="hacker-news"> Hacker News </option>
                </select>
              </div>
              <p>You have used {this.state.clickCounter} free articles</p>
                { /* Pass in the child component*/ }
                { /* Share state with the child*/ }
                { /* Your code here*/ }
                {this.state.clickCounter >= 5 ? <h2>PAY UP</h2> :
                <Feed feed={this.state.randomFeed}
                loader={this.state.loader}
                handleClick={this.randomizer}/>
                }
            </div>
    );
  }
}




export default App;
