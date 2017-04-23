/* globals $ */

var MovieSearch = {
	dom: {},
	activeMovie: null,

	init: function() {
		this.dom = {
			input: $(".moviesearch-input"),
			poster: $(".moviesearch-movie-poster"),
			title: $(".moviesearch-movie-info-title"),
			year: $(".moviesearch-movie-info-year"),
			plot: $(".moviesearch-movie-info-plot"),
			director: $(".moviesearch-movie-info-director"),
			actors: $(".moviesearch-movie-info-actors"),
			genres: $(".moviesearch-movie-info-genres"),
		};

		this.listen();
	},

	listen: function() {
		this.dom.input.on("keyup", function() {
			this.search(this.dom.input.val());
		}.bind(this));
	},

	search: function(title) {
		// Early exit for short titles
		if (title.length < 3) {
			this.activeMovie = null;
			this.render();
			return;
		}

		$.ajax({
			url: "http://omdbapi.com",
			data: { t: title },
			dataType: "json",
		})
		.then(function(res) {
			if (res.Error) {
				this.activeMovie = null;
			}
			else {
				this.activeMovie = res;
			}

			this.render();
		}.bind(this))
		.catch(function() {
			this.activeMovie = null;
			this.render();
		}.bind(this));
	},

	render: function() {
		if (this.activeMovie) {
			this.dom.poster.attr("src", this.activeMovie.Poster);
			this.dom.title.html(this.activeMovie.Title);
			this.dom.year.html(this.activeMovie.Year);
			this.dom.plot.html(this.activeMovie.Plot);
			this.dom.director.html("Directed by " + this.activeMovie.Director);
			this.dom.actors.html("Starring " + this.activeMovie.Actors);
			this.dom.genres.html(this.activeMovie.Genre);
		}
		else {
			this.dom.poster.attr("src", "");
			this.dom.title.html("No movie found");
			this.dom.year.html("");
			this.dom.plot.html("");
			this.dom.director.html("");
			this.dom.actors.html("");
			this.dom.genres.html("");
		}
	},
};

$(document).ready(function() {
	MovieSearch.init();
});
