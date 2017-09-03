import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');

class Images extends Component {
  render = () => {
    if (this.props.imglist.nodes !== undefined) {
      return (
        <div>
          <section>
            <div>
              <ul>
              </ul>
            </div>
          </section>
          <section>
            <div>
              <ul>
                {this.state.imglist.map((nodes) => {
                  return (
                    <li key={nodes.id}>
                      <img src={nodes.display_src}/>
                      {/* <h3>{nodes.title}</h3>
                      <p>brought by: {nodes.user}</p>
                      <button onClick={() => this.removeItem(nodes.id)}>Remove Item</button> */}
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </div>

      )
    }
    else {
      return (
        <div>
        Need data to do this
        </div>
      )
    }

  }
}


class App extends Component {
	constructor() {
		super();
		this.state = {
      tag: "",
      imgList: []
		}
		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.scrape = this.scrape.bind(this);
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

  scrape = () => {
    axios.get(`https://www.instagram.com/explore/tags/${this.state.tag}/?__a=1`)
    //This arrow statement keeps this working
    .then((response) => {
      this.setState({
        imgList: response.data.tag.media.nodes,
      });
      console.log(this.state.imgList)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
	render = () => {
		return (
      <div className='container'>
        <section className='add-item'>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="tag" className="ghost-input" placeholder="Tag to search"  onChange={this.handleChange} value={this.state.tag} required></input>
            <input type="submit" className="ghost-button" value="Get Images"></input>
          </form>
        </section>
      </div>
		)
	};
}

export default App;
