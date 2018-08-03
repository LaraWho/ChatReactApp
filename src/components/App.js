import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.baseUrl = 'https://practiceapi.devmountain.com/api'

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`${this.baseUrl}/posts`).then(results => {
      this.setState({ posts: results.data })
    })
  }

  updatePost(id, text) {
    axios.put(`${this.baseUrl}/posts/${id}/${text}`).then(results => {
      this.setState({ posts: results.data })
    })
  }

  deletePost(id, text) {
    axios.delete(`${this.baseUrl}/posts/${id}`).then(results => {
      this.setState({ posts: results.data })
    })
  }

  createPost(text) {
    axios.post(`${this.baseUrl}/posts`, {text}).then(results => {
      this.setState({ posts: results.data})
    })
  }

  render() {
    const posts = this.state.posts.map((post, i) => {
      return(
        <Post 
        key={post.id}
        text={post.text}
        date={post.date}
        id={post.id}
        updatePostFn={this.updatePost}
        deletePost={this.deletePost}
        />
      )
    })
  

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose 
          createPostFn={ this.createPost }/>
          { posts }

        </section>
      </div>
    );
  }
}

export default App;
