import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      name: '',
      email: '',
      password: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
      cc: '',
      exp: '',
      cvv: '',
      billingZipCode: '',
      page: 0,
      clicked: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.pageCount = this.pageCount.bind(this)
    this.hideButton = this.hideButton.bind(this)
    this.updateAcc = this.updateAcc.bind(this)
    this.addAcc = this.addAcc.bind(this)
  }
  handleInput(e) {
    e.preventDefault();
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => console.log(this.state)
    );
  }

  pageCount () {
    let increment = this.state.page + 1;
    this.setState({
      page: increment
    })
  }

  addAcc () {
    let increment = this.state.page + 1;
    axios
    .post('/api/info', this.state)
    .then(() => console.log('Successful'))
    .catch(err => console.error('Failed'))
    this.setState({
      page: increment
    })
  }

  updateAcc (em) {
    let increment = this.state.page + 1;
    let { name, email, password, address, city, state, zipcode, phone, cc, exp, cvv, billingZipCode } = this.state
    axios
    .put(`/api/info/${em}`, {name, email, password, address, city, state, zipcode, phone, cc, exp, cvv, billingZipCode})
    .then(() => console.log('Successful'))
    .catch(err => console.error('Failed'))
    this.setState({
      page: increment
    })
  }
  hideButton () {
    this.setState({
      clicked: !this.state.clicked,
    })
    this.pageCount();
  }
  render() {
    let styles = {
      display: 'none'
    }

    return (
      <div>

      <button onClick={this.hideButton} style={this.state.clicked ? styles : null}> Checkout </button>
    
        

      {this.state.page === 1 &&
      <div>
        <h1> Create Account </h1>
  
          <label>Name:</label>
          <input type="text" name="name" onChange={this.handleInput} />
          <br />
          <label>Email:</label>
          <input type="text" name="email" onChange={this.handleInput} />
          <br />
          <label>Password:</label>
          <input type="text" name="password" onChange={this.handleInput} />
          <br />
          <button onClick={this.addAcc}> Submit </button>

        </div>
        }
        {this.state.page  === 2 &&
        <div> 

          <label>Address:</label>
          <input type="text" name="address" onChange={this.handleInput} />
          <br />
          <label>City:</label>
          <input type="text" name="city" onChange={this.handleInput} />
          <br />
          <label>State:</label>
          <input type="text" name="state" onChange={this.handleInput}/>
          <br />
          <label>Zip Code:</label>
          <input type="text" name="zipcode" onChange={this.handleInput} />
          <br/>
          <button onClick={() => this.updateAcc(this.state.email)}> Submit </button>

        </div>
        }
        {this.state.page === 3 &&
        <div>
          <label>Credit Card Number</label>
          <input type="text" name="cc" onChange={this.handleInput}/>
          <br />
          <label>Exp Date:</label>
          <input type="text" name="exp" onChange={this.handleInput}/>
          <br />
          <label>CVV</label>
          <input type="text" name="cvv" onChange={this.handleInput} />
          <br />
          <label>Billing Zip Code:</label>
          <input type="text" name="billingZipCode" onChange={this.handleInput}/>
          <br/>
          <button onClick={() => this.updateAcc(this.state.email)}> Purchase </button>
        </div>
        }

        {this.state.page === 4 && 
        <div>
          <h1> Confirmation Page </h1>
          <br/>
          <span> Name: {this.state.name} </span>
          <br/>
          <span> Email: {this.state.email} </span>
          <br/>
          <span> Password: {this.state.password} </span>
          <br/>
          <span> Address: {this.state.address} </span>
          <br/>
          <span> City: {this.state.city} </span>
          <br/>
          <span> State: {this.state.state} </span>     <br/>
          <span> Zip Code: {this.state.zipcode} </span>
          <br/>
          <span> cc: {this.state.cc} </span>     <br/>
          <span> exp: {this.state.exp} </span>
          <br/>
          <span> Billing Zip Code: {this.state.billingZipCode} </span>

          </div>
        } 
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
