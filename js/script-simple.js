$(document).ready(function() {
	var $input = $(".moviesearch-input");
	var $poster = $(".moviesearch-movie-poster");
	var $title = $(".moviesearch-movie-info-title");
	var $year = $(".moviesearch-movie-info-year");
	var $plot = $(".moviesearch-movie-info-plot");
	var $director = $(".moviesearch-movie-info-director");
	var $actors = $(".moviesearch-movie-info-actors");
	var $genres = $(".moviesearch-movie-info-genres");

	$input.on("keyup", function() {
		var title = $input.val();

		// Don't search if it's a short title
		if (title.length < 3) {
			return;
		}

		$.ajax({
	    url: "http://omdbapi.com",
	    data: { t: title },
	    dataType: "json",
	    success: function(res) {
				if (!res.Error) {
					// Input the movie in to all elements
					$poster.attr("src", res.Poster);
					$title.html(res.Title);
					$year.html(res.Year);
					$plot.html(res.Plot);
					$director.html("Directed by " + res.Director);
					$actors.html("Starring " + res.Actors);
					$genres.html(res.Genre);
				}
				else {
					// Reset all elements with blank values
					$poster.attr("src", "");
					$title.html("No movie found");
					$year.html("");
					$plot.html("");
					$director.html("");
					$actors.html("");
					$genres.html("");
				}
	    },
	  });
	});
});
