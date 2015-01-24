var Navigation = (function(){

	var load = function(anchor){
		// Get optional parameters
		var params = "";
		if(anchor.indexOf("=") != -1){
			params = decodeURIComponent(anchor.split("=").pop());
			anchor = anchor.split("=");
			anchor = anchor[0];
		}

		// What to do depending anchor
		switch(anchor){
			case "home":
				Game.initialize();
				break;
			default :
				Navigation.go("home");
				break
		}
	};

	return{
		initialize: function(){
			var url;
			var anchor;

			// Automatic catch history change
			window.History.Adapter.bind(window,"popstate",function(){
				url = window.History.getState().url;
				anchor = url.split('?').pop();

				load(anchor);
			});

			// Manually catch first change
			url = window.History.getState().url;
			anchor = url.split('?').pop();

			load(anchor);
		},
		/**
		 * @param {String} where
		 */
		go: function(where){
			window.History.pushState(null, "Memory", "?"+where);
		}
	};
}());
