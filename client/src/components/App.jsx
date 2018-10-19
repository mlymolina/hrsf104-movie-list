import React from 'react';

class MovieList extends React.Component {
  constructor(props) {
  	super(props);

    this.state = {
      movies: this.props.movies,
      filteredMovies: this.props.movies.slice(0),
      activeTab: 'watched'
    }
  }
  
  filterMovieList(query) {
  	const filtered = this.state.movies.filter((movie) => {
    	return movie.title.toLowerCase().includes(query.toLowerCase());
    });
    
    this.setState({
    	filteredMovies: filtered
    });
  }
  
  addMovie(movieName) { 
  	if(movieName !==''){
 			const self = this;
      //For this particular project I included the API key directly into the url, but this key should be in a config file and use gitignore to not include the key in the online repo.
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.props.API_KEY}&language=en-US&query=" ${movieName}"&page=1&include_adult=false`;
      
      fetch(url)
  		.then(function(response) {
    		return response.json();
  			})
      .then(function(json) {
      
          if(json.results.length > 0) {
          const movie = json.results[0]; 
          const title = movie.title;
          const id = movie.id;
          const rating = movie.vote_average;
          const year = movie.release_date.split('-')[0];
          const overview = movie.overview;
          const newMovie = {id: id, title: title, watched: false, imdbRating: rating, year: year, overview: overview};


          const newMovieList = [...self.state.movies, newMovie];
          self.setState({
            movies: newMovieList,
           filteredMovies: newMovieList.slice(0)
          });
        }
      });
    }
  }
  
  chooseTab(event) {
  	this.setState({
    	activeTab: event.target.value
    });
  }
  
 toggleMovieWatch(movieId) {
  const newMovieList = this.state.movies.slice(0);
  const movieIndex = newMovieList.map(movie => movie.id).indexOf(movieId);
  newMovieList[movieIndex].watched = !newMovieList[movieIndex].watched;
  
  this.setState({
  	movies: newMovieList
  })
 }
  
  
	render() {
    return (
      <div className="app">
        <TextInput 
          className="addNewMovie"
          description="Add new movie"
          buttonName ="Add"
          onSubmit={this.addMovie.bind(this)
          }/>
        
          
        <button
          className={this.state.activeTab === 'watched' ? "activeTab list" : "list"}
          value="watched"
          onClick={this.chooseTab.bind(this)}>
          Watched
        </button>
        
        <button
          className={this.state.activeTab === 'toWatch' ? "activeTab list" : "list"}
          value="toWatch"
          onClick={this.chooseTab.bind(this)}>
          To Watch
        </button>
        
        <TextInput 
          description="Search..." 
          className="searchBox"
          buttonName="Go!"
          onSubmit={this.filterMovieList.bind(this)}
          />
        
        {this.state.filteredMovies.length === 0 && <div>No movie found</div>}
        
        {this.state.activeTab === 'watched' &&
	        <MovieTab 
            movies={this.state.filteredMovies} 
            toggleWatch={this.toggleMovieWatch.bind(this)} 
            showWatched={true}
            />
        }
        
        {this.state.activeTab === 'toWatch' &&
	        <MovieTab
            movies={this.state.filteredMovies}
            toggleWatch={this.toggleMovieWatch.bind(this)}
            showWatched={false}
            />
        }
        
      </div>
    )
  }
}

class MovieTab extends React.Component {

	render () {
  	return (
    	 <ol>
          {this.props.movies
          	.filter((movie) => movie.watched === this.props.showWatched)
          	.map((movie, index) => (
              <Movie movie={movie} key={index} toggleWatch={this.props.toggleWatch}/>
            ))}
        </ol>
    
    );
  }
}

class Movie extends React.Component {
	constructor(props) {
  	super(props);
    
    this.state = {
    	showDescription: false
    }
    
  }
  
  onMovieClick(){
  	this.setState({
    	showDescription: !this.state.showDescription
    });
  }
  
  render() {
    return (
    <li 
      className="movieElement" 
      onClick={this.onMovieClick.bind(this)}>
      {this.props.movie.title}

      {this.state.showDescription && 
      	<div>
          <ul>
            <li>Year: {this.props.movie.year }</li>
            <li>imdbRating: {this.props.movie.imdbRating}</li>
            <li>Overview: {this.props.movie.overview}</li>
            <li>
               <button 
                 className={this.props.movie.watched ? "activeTab watchToggleButton"  : "watchToggleButton" }
                 onClick={() => this.props.toggleWatch(this.props.movie.id)}>
                 {this.props.movie.watched ? "Watched" : "Watched" }
               </button> 
            </li>
          </ul>         
        </div>
      }
   </li>
    )
  } 
}

class TextInput extends React.Component {
  constructor(props) {
	  super(props);

    this.state = {
	    inputValue: ''
    }
  }
  
  onInputChange = (event) => {
  	this.setState({
    	inputValue: event.target.value
    })
  }
  
  render() {
    return (
      <div className={this.props.className}>
        <input 
          type='text'
          placeholder={this.props.description}
          value={this.state.inputValue}
          onChange={this.onInputChange.bind(this)}
          /> 
        <button 
          className="inputButton"
          onClick={() => this.props.onSubmit(this.state.inputValue)}>
          {this.props.buttonName}
        </button>
      </div>
    );
  }
}


export default MovieList;