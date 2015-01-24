var Game = (function(){
	var _container; var _previous; var _founded = 0;
	var _sample = [
		"fa fa-html5",
		"fa fa-css3",
		"fa fa-github",
		"fa fa-codepen",
		"fa fa-android",
		"fa fa-apple",
		"fa fa-dropbox",
		"fa fa-linux",
		"fa fa-steam",
		"fa fa-windows",
		"fa fa-youtube",
		"fa fa-twitter"
	];

	var check = function(current){
		// No other card yet to compare
		if(_previous == undefined)
			_previous = current;
		else{
			var previous = _previous;
			_previous = undefined;

			// Check if cards are similar
			if(previous.getName() == current.getName()){
				// Mark card as found
				previous.success();
				current.success();

				// Count how many card have been found
				_founded++;

				// Check if game is finished
				if(_founded == _sample.length){
					_founded = 0;
					endGame();
				}
			}
			// Card are different
			else{
				// Wait a bit before flipping back cards
				setTimeout(function(){
					// Flip back cards
					previous.revert();
					current.revert();
				},400);
			}
		}
	};
	
	var endGame = function(){
		var modal = $("<div/>", {"class": "modal fade", "tabIndex": -1, "role": "dialog",
			"aria-labelledby": "Detail", "aria-hidden": true}).appendTo($("body"));

		var dialog = $("<div/>", {"class": "modal-dialog"}).appendTo(modal);

		var content = $("<div/>", {"class": "modal-content"}).appendTo(dialog);

		var body = $("<div/>", {"class": "modal-body text-center"}).appendTo(content);
		$("<h1/>", {"html": "Well done !"}).appendTo(body);

		$("<button/>", {"type": "button", "class": "btn btn-primary btn-lg", "html": "Want to play again ?",
			"data-dismiss": "modal"}).css({"marginBottom": "21px"}).appendTo(body);

		var text = $("<p/>", {"html": "Inspired by "}).css({"marginBottom": "21px"}).appendTo(body);
		$("<a/>", {"href": "http://codepen.io/natewiley/full/HBrbL/", "target": "_blank", "html":
			"http://codepen.io/natewiley/full/HBrbL/"}).appendTo(text);

		$("<p/>", {"class": "lead", "html": "Share it ?"}).appendTo(body);

		var twitter = $("<a/>", {"href": "http://twitter.com/share?url="+window.location.origin+window.location.pathname,
			"target": "_blank", "class": "btn btn-default btn-social btn-twitter"}).appendTo(body);
		$("<i/>", {"class": "fa fa-twitter"}).appendTo(twitter);

		var facebook = $("<a/>", {"href": "https://www.facebook.com/sharer/sharer.php?u="+window.location.origin+window.location.pathname,
			"target": "_blank", "class": "btn btn-default btn-social btn-facebook"}).appendTo(body);
		$("<i/>", {"class": "fa fa-facebook"}).appendTo(facebook);

		var google = $("<a/>", {"href": "https://plus.google.com/share?url="+window.location.origin+window.location.pathname,
			"target": "_blank", "class": "btn btn-default btn-social btn-google"}).appendTo(body);
		$("<i/>", {"class": "fa fa-google-plus"}).appendTo(google);

		var absolute = $("<div/>").css({"position": "absolute", "left": "50%", "bottom": "5px"}).appendTo(modal);
		$("<div/>", {"html": "All logos are property of their respective owners, No Copyright infringement intended"})
			.css({"position": "relative", "left": "-50%", "color": "white"}).appendTo(absolute);

		// Remove modal from DOM when hidden
		modal.on("hidden.bs.modal", function(){
			modal.remove();
			Game.initialize();
		});

		// Manually show modal
		modal.modal({
			"show": true,
			"backdrop": "static"
		});
	};

	return{
		initialize: function(){
			_container = Skeleton.getContent().html("");

			var row = $("<div/>", {"class": "row"}).appendTo(_container);

			var cards = _sample.concat(_sample);
			var size = cards.length;

			for(var i = 0; i < size; i++){
				var col = $("<div/>", {"class": "col-xs-4 col-sm-2"}).appendTo(row);

				// Get a random index
				var random = Math.floor(Math.random() * cards.length);

				// Get the random element
				var card = cards[random];

				// Remove this element
				cards.splice(random, 1);

				new Card({
					container: col,
					card     : card,
					callback : function(obj){
						check(obj)
					}
				});
			}
		}
	};
}());
