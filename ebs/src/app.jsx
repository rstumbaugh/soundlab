import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      message: ''
    };
  }

  componentDidMount() {
    axios.get('https://sul0jd1ro0.execute-api.us-east-1.amazonaws.com/prod/testing')
      .then((response) => {
        this.setState({
          message: response.data.message
        });
      }).catch((err) => {
        this.setState({
          message: err
        });
      });
  }

  render() {
    return <h1>{`Message: ${this.state.message}`}</h1>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
