import React, { Component } from 'react';
import './App.css';
import * as moment from "moment";
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Verses from './Verses';
import logo from './bible2.jpeg';
import responsiveVoice from './responsivevoice';


class App extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      show_verse: false,
      verses: []
    }  

    this.searchBibleVerse = this.searchBibleVerse.bind(this);
    this.showVerse = this.showVerse.bind(this);

  }

  componentDidMount(){

    const url = "https://bible-api.com/john3:16";
    axios.get( url ).then( (response) => {
      this.setState({
        show_verse: true,
        verses: response.data.verses
      });
    }); 
    
  }

  searchBibleVerse = (e) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();

      const url = "https://bible-api.com/" + this.search_bible.value;
      axios.get( url ).then( (response) => {
        this.setState({
          show_verse: true,
          verses: response.data.verses
        });
      });

    }
  };

  showVerse(){

    if (this.state.show_verse === true) {

      return this.state.verses.map( (item) => {

        responsiveVoice.speak(item.text);

        return (
          <Verses key={item.book_id} item={item} />
        );
        
      });

    }

  }

  render() {

    return (
      <div className="App container">
        <div className="center-div col-md-12" id="center-div">   
          <div className="row mt-5">
            <div className="col-md-4 offset-md-4">
              <img src={logo} alt="bible" className="img-fluid" />
            </div> 
          </div>
          <div className="col-md-6 offset-md-3">
            <form onKeyDown={(e) => { this.searchBibleVerse(e); }} >
              <div className="right-inner-addon">
                <span><FaSearch /></span>
                <input type="search"  placeholder="Enter a Bible Verse" className="form-control input-block input-lg" ref = { input => this.search_bible = input }  />
              </div>
              {this.showVerse()}
            </form>
          </div>
        </div>
        <div className="fixed-bottom text-center">
            <p className="text-small">&copy;Copyright {moment().format('YYYY')}; Memory Verse App.</p>
        </div>
      </div>
    );
  }
}

export default App;
