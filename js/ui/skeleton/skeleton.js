var Skeleton = (function(){
	var _container = $("body"); var _navbar; var _content;

	return{
		initialize: function(){
			// Navbar
			_navbar = $("<nav/>").appendTo(_container);
			Navbar.initialize();

			// Content
			_content = $("<div/>", {"class": "container"});
			_container.append(_content);

			// AJAX Navigation
			Navigation.initialize();
		},
		getNavbar: function(){
			return _navbar;
		},
		getContent: function(){
			return _content;
		}
	};
}());
