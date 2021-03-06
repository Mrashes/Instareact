import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
const axios = require('axios');

class Images extends Component {
  render = () => {
      return (
        <div>
          <section>
            <div className="flex">
              {this.props.imglist.map((node) => {
                return (
                  <div key={node.id}>
                    <img className="image" src={node.display_src} alt="instagram" />
                  </div>
                )
              })}
            </div>
          </section>
        </div>

      )
  }
}

class Input extends Component {
  
  render = () => {
    return (
      <section className='add-item'>
          <form onSubmit={this.props.handleSubmit}>
            <input type="text" name="tag" className="ghost-input" placeholder="Tag to search"  onChange={this.props.handleChange} value={this.props.tag} required></input>
            <input type="submit" className="ghost-button" value="Get Images"></input>
          </form>
        </section>
    )
  }
}


class App extends Component {
	constructor() {
		super();
		this.state = {
      tag: "",
      imgList: [{id: 1,
                 display_src: ""}],
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
    this.setState({
      oldtag: this.state.tag,
	    tag: '',
    });
    this.scrape(this.state.tag.split(' ').join(''))

  }

  // getInitialState() {
  //   return { showResults: false };
  // }
  // onClick () {
  //     this.setState({ showResults: true });
  // }  

  scrape = (tag) => {
    console.log(tag)
    axios.get(`https://www.instagram.com/explore/tags/${tag}/?__a=1`)
    // `https://www.instagram.com/graphql/query/?query_id=17882293912014529&tag_name=${this.state.oldtag}&first=100&after=${endpointpulled from last query}`
    //This arrow statement keeps this working
    .then((response) => {
      // This is me trying to get more photos
      // let endpoint = response.data.tag.media.page_info.end_cursor

      if (response.data.tag.media.count === 0) {
        this.setState({
          imgList: response.data.tag.top_posts.nodes,
        });
      }

      else {
        this.setState({
          imgList: response.data.tag.media.nodes,
        });
        if (response.data.tag.media.page_info.has_next_page) {
          // setTimeout(function() { this.secondScrape(endpoint); }.bind(this), 20000);
        }
      }      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  secondScrape = (endPoint) => {    
    axios.get(`https://www.instagram.com/graphql/query/?query_id=17882293912014529&tag_name=${this.state.oldtag}&first=100&after=${endPoint}`).then((responseAgain) => {
      // console.log(response)
      console.log(responseAgain.data.data.hashtag.edge_hashtag_to_media)
      if (responseAgain.data.data.hashtag.edge_hashtag_to_media.count !== 0) {
        this.setState({
          imgList: responseAgain.data.data.hashtag.edge_hashtag_to_media.edges,
        });
      }
      // console.log(responseAgain.data.data.hashtag.edge_hashtag_to_media.edges)
    })    
    .catch(function (error) {
      console.log(error);
    });
  }
  
	render = () => {
		return (
      <div className='container'>
        <Input handleChange={this.handleChange} handleSubmit={this.handleSubmit} tag={this.state.tag} />
        <Images imglist={this.state.imgList} />
      </div>
		)
	};
}

export default App;
