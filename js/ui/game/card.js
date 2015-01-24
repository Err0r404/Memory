/**
 * @param {Object} settings
 * @param {Object} settings.card
 * @param {jQuery} settings.container
 * @param {Function} settings.callback
 * @constructor
 */
var Card = function(settings){
	//console.info(settings);
	var _this     = this;
	var card      = settings.card;
	var container = settings.container;
	var callback  = settings.callback;

	var flipped = false;

	var panel = $("<div/>", {"class": "panel panel-default hover"}).appendTo(container);

	var front = $("<div/>", {"class": "panel-body text-center"}).appendTo(panel);
	var h = $("<h1/>").appendTo(front);
	$("<i/>", {"class": "fa fa-question-circle fa-2x"}).appendTo(h);

	var back = $("<div/>", {"class": "panel-body text-center"});
	h = $("<h1/>").appendTo(back);
	$("<i/>", {"class": card+" fa-2x"}).appendTo(h);
	
	panel.bind("click", function(e){
		e.preventDefault();

		if(!flipped){
			$(this).flip({
				direction  : "lr",
				content    : back[0],
				color      : "transparent",
				speed      : 250,
				onAnimation: function(){
					flipped = true;
				},
				onEnd      : function(){
					callback(_this);
				}
			});
		}
	});

	this.getName = function(){
		return card;
	};

	this.revert = function(){
		panel.flip({
			direction  : "rl",
			content    : front[0],
			color      : "transparent",
			speed      : 250,
			onAnimation: function(){
				flipped = false;
			}
		});
	};

	this.success = function(){
		panel.toggleClass("panel-default panel-success");
	};
};
