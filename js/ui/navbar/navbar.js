var Navbar = (function(){
	var _container;

	return{
		initialize: function(){
			_container = Skeleton.getNavbar();
			_container.addClass("navbar navbar-default navbar-fixed-top").attr("role", "navigation").html("");

			var innerContainer = $("<div/>", {"class": "container"}).appendTo(_container);

			var header = $("<div/>", {"class": "navbar-header"}).appendTo(innerContainer);

			var toggleButton = $("<button/>", {"type": "button", "class": "navbar-toggle", "data-toggle": "collapse",
				"data-target": ".navbar-collapse"}).appendTo(header);

			$("<span/>", {"class": "sr-only", "html": "Show navigation"}).appendTo(toggleButton);

			$("<span/>", {"class": "icon-bar"}).appendTo(toggleButton);
			$("<span/>", {"class": "icon-bar"}).appendTo(toggleButton);
			$("<span/>", {"class": "icon-bar"}).appendTo(toggleButton);

			var brand = $("<a/>", {"href": "#!", "class": "navbar-brand", "html": "Memory"}).appendTo(header);

			// Load dashboard when clicking on brand
			brand.on("click", function(e){
				e.preventDefault();
				Navigation.go("home");
			});
		}
	};
}());
