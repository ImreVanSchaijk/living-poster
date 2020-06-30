import React from 'react';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import r from './Login';

import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      defaultSubreddits: ['itookapicture', 'astrophotography', 'nocontextpics', 'houseplants', 'space'],
      postData: [],
      userInput: '',
      postProgressCounter: 0,
      delay: 10000,
    };

    this.extractDataFromSubreddit = this.extractDataFromSubreddit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { defaultSubreddits } = this.state;
    const subredditRef = defaultSubreddits[Math.floor(Math.random() * defaultSubreddits.length)];
    this.extractDataFromSubreddit(subredditRef);

    document.addEventListener('keydown', this.handleKeyPress);
  }

  /*
  * TODO!
  * Make it so the script doesn't break when no matching subreddits have been found
  */

  // search reddit for subreddits which fit in with the user input and extract their data
  async extractDataFromSubreddit(userInput) {
    const { delay } = this.state;
    this.setState({ loading: true });

    const possibleSubrredits = await r.searchSubreddits({ query: userInput, includeNsfw: true });
    const postData = [];
    let counter = 0;

    // Check if the subreddit has valid images, if not, repeat and check next best subreddit
    while (postData.length === 0) {
      const postInformation = await r.getSubreddit(possibleSubrredits[counter].display_name).getNew();

      // Check which submissions have an image attached to them, push into new array
      postInformation.forEach((post) => {
        if (post.url.match(/\.(jpeg|jpg|png)$/)) {
          postData.push(post);
        }
      });

      counter += 1;
    }
    this.setState({ postData, loading: false });

    // Start the timer to change the image
    this.interval = setInterval(this.tick, delay);

    console.log(this.state.postData);
  }

  tick() {
    /*
    /* make sure the loop rolls back to the beginning
    /* the -1 is to prevent the progress to go 1 too far
    /* since arrays start at 0
    */
    const { postProgressCounter, postData } = this.state;

    this.setState(({ postProgressCounter: prevState }) => ({
      postProgressCounter: (postProgressCounter < postData.length - 1)
        ? prevState + 1
        : 0,
    }));
  }

  handleChange(e) {
    this.setState({ userInput: e.target.value });
  }

  handleKeyPress(e) {
    // when any key is pressed be sure to focus the input form
    document.getElementById('userInput').focus();

    if (e.target.value && e.key === 'Enter') {
      // Remove the extistant timer
      clearInterval(this.interval);

      this.extractDataFromSubreddit(e.target.value);

      // clear user input for next entry
      this.setState({
        userInput: '',
      });

      e.target.blur();
    }
  }

  render() {
    const { postData, postProgressCounter, userInput } = this.state;

    return (
      <div className="wrapper">
        {postData.length > 0 && (
          <React.Fragment>
            <Header postTitle={postData[postProgressCounter].title} postSubreddit={postData[postProgressCounter].subreddit.display_name} />
            <MainContent postUrl={postData[postProgressCounter].url} />
            <Footer postAuthor={postData[postProgressCounter].author.name} />

            <input
              id="userInput"
              className="userInputCoverScreen"
              name="userInputSearchQuery"
              value={userInput}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}
