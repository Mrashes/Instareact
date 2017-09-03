import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');

class App extends Component {
  ////This request searches for the url which returns a json file in a string  I need to figure out how to feed it to a site
  //// Currently (7/19) there is an issue where it's not letting medo the request.  Problably because I'm using react but I'm not sure
  scrape() {
    axios.get(`https://www.instagram.com/explore/tags/${this.state.tag}/?__a=1`)
    .then(function (response) {
      // console.log(response);
      // Currently this doesn't allow me to set state inside here...  Don't know why.  Its saying that set state is undefined
      this.setState({
        imgList: response.data.tag.media.nodes,
      });
      console.log(this.state.imgList)
    })
    .catch(function (error) {
      console.log(error);
    });
  }


	constructor() {
		super();
		this.state = {
      tag: "",
      imgList: {}
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
    this.scrape(this.state.tag)
	  this.setState({
	    tag: '',
    });
  }
  
	render() {
		return (
      <div className='container'>
        <section className='add-item'>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="tag" className="ghost-input" placeholder="Tag to search"  onChange={this.handleChange} value={this.state.tag} required></input>
            <input type="submit" className="ghost-button" value="Get Images"></input>
          </form>
        </section>
        <section className='display-item'>
						<div className='wrapper'>
							<ul>
							</ul>
						</div>
					</section>
					<section className='display-item'>
					  <div className="wrapper">
					    <ul>
					      {/* {this.state.imglist.data.tag.media.nodes.map((nodes) => {
					        return (
					          <li key={nodes.id}>
					            <h3>{nodes.title}</h3>
					            <p>brought by: {nodes.user}</p>
					            <button onClick={() => this.removeItem(nodes.id)}>Remove Item</button>
					          </li>
					        )
					      })} */}
					    </ul>
					  </div>
					</section>
      </div>
		)
	};
}

export default App;
