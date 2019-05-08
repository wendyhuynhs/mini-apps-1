import React from 'react';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csv: '',
      query: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    fetch('/api', {
      method: 'POST',
      body: this.state.query,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        fetch('/api', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
      })
      .then(data => data)
      .catch(err => console.log(err));
    document.getElementById('form').reset();
  }
  handleInput(e) {
    this.setState({ query: e.target.value });
  }
  render() {
    return (
      <div>
        Data
        <form id="form" onSubmit={this.handleInput}>
          <input required type="text" onChange={this.onSubmit} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
