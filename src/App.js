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
                    {/* <h3>{nodes.title}</h3>
                    <p>brought by: {nodes.user}</p>
                    <button onClick={() => this.removeItem(nodes.id)}>Remove Item</button> */}
                  </div>
                )
              })}
            </div>
          </section>
        </div>

      )
  }
}


class App extends Component {
	constructor() {
		super();
		this.state = {
      tag: "",
      imgList: [{id: 1,
                 display_src: ""}]
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
      oldtag: this.state.tag,
	    tag: '',
    });
  }

  scrape = () => {
    console.log(this.state.tag)
    axios.get(`https://www.instagram.com/explore/tags/${this.state.tag}/?__a=1`)
    // `https://www.instagram.com/graphql/query/?query_id=17882293912014529&tag_name=${this.state.oldtag}&first=100&after=${endpointpulled from last query}`
    //This arrow statement keeps this working
    .then((response) => {
      let endpoint = response.data.tag.media.page_info.end_cursor
      console.log(response)
      this.setState({
        imgList: response.data.tag.media.nodes,
      });
      console.log(this.state.imgList)



      //This is me trying to get more photos

      // if (response.data.tag.media.page_info.has_next_page) {
        
      //   //Just ensuring the state is passed properly
      //   console.log(`https://www.instagram.com/graphql/query/?query_id=17882293912014529&tag_name=${this.state.oldtag}&first=100&after=${endpoint}`)

      //   axios.get(`https://www.instagram.com/graphql/query/?query_id=17882293912014529&tag_name=${this.state.oldtag}&first=100&after=${endpoint}`).then((responseAgain) => {
      //     console.log(responseAgain)
      //     if (responseAgain.data.data.hashtag.edge_hashtag_to_media.edges !== 0) {
      //       this.setState({
      //         imgList: responseAgain.data.data.hashtag.edge_hashtag_to_media.edges,
      //       });
      //     }
      //     else {
      //       this.setState({
      //         imgList: response.data.tag.nodes,
      //       });
      //     }

      //     // console.log(responseAgain.data.data.hashtag.edge_hashtag_to_media.edges)
      //   })    
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      // }
      
      // else {
        // this.setState({
        //   imgList: response.data.tag,
        // });
        // console.log(this.state.imgList)
      // }

      //Send and create  new component with images

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
        <Images imglist={this.state.imgList} />
      </div>
		)
	};
}

export default App;
