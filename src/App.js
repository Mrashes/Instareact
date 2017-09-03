import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');

class App extends Component {
  ////This request searches for the url which returns a json file in a string  I need to figure out how to feed it to a site
  //// Currently (7/19) there is an issue where it's not letting medo the request.  Problably because I'm using react but I'm not sure
  scrape() {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=imperial&appid=0a1ba0538e40bc2e35caba7852e08e7c`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


	constructor() {
		super();
		this.state = {
      city: "",
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
  
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
	  e.preventDefault();
    this.scrape(this.state.city)
	  this.setState({
	    city: '',
    });
  }
  
	render() {
		return (
      <div class='container'>
        <section className='add-item'>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="city" class="ghost-input" placeholder="Tag to search"  onChange={this.handleChange} value={this.state.city} required></input>
            <input type="submit" class="ghost-button" value="Get Images"></input>
          </form>
        </section>
        {/* <button onClick={this.scrape} /> */}
      </div>
		)
	};
}

export default App;
