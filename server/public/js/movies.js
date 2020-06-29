const Movies = { template:
  `<div class="row">
  	<div class="col">
  		<div class="card" v-for="movie in movies" :key="movies._id">
  			<div class="row no-gutters">
  				<div class="col-md-4">
  					<img v-if="movie.poster" v-bind:src=movie.poster class="card-img" alt="">
  				</div>
  				<div class="col-md-8">
  					<div class="card-body">
  						<h5 class="card-title">{{ movie.title }}</h5>
  						<p v-if="movie.hasOwnProperty('imdb') && movie.imdb.rating != null" class="card-text">{{movie.imdb.rating}}/10</p>
  						<p class="card-text">{{ movie.plot }}</p>
  						<p class="card-text">Release date: {{ movie.released | limit(10) }}</p>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
  </div>`,

  data() {
   return {
     movies: []
   }
 },

 methods: {
   listMovies: function () {
     axios.get("http://localhost:3000/api/movies")
       .then(response => (this.movies = response.data))
       .catch(error => (console.log(error)));
     },
     init: function(){
       this.listMovies();
     }
  },

  mounted(){
    this.init()
  },

  filters: {
    limit: function(text, length) {
      if(text==null) return "";
        return text.substring(0, length);
      }
   }
}
