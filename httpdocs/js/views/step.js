define([
	"jquery",
	"underscore",
	"backbone",
	'text!templates/step.html'
	], function($, _, Backbone, stepHTML){
		var stepView = Backbone.View.extend({
			el: "#content",
			step: 0,

			events: {
				"click .buttons": "loadNextClickCallback",
				"click .bucket": "bucketClickCallback"
			},

			/**
			 * Handle what happens when a bucket is clicked.
			 */
			bucketClickCallback: function(event) {
				$(event.currentTarget).find("input").prop("checked", true);
			},

			/**
			 * Get the value of the radio that is checked.
			 * @return String - returns false if 
			 */
			getCheckedValue: function() {
				var value = false;
				$("#buckets input").each(function() {
					if($(this).prop("checked")) {
						value = $(this).val();
					}
				});

				return value;
			},

			/**
			 * Get the appropriate title for this view.
			 * @return String
			 */
			getTitle: function() {
				switch(this.step) {
					case 1: return "First";
					case 2: return "Second";
					case 3: return "Third";
					case 4: return "Fourth";
					case 5: return "Fifth";
				}
			},

			/**
			 * Handle what happens when the Next button is clicked.
			 */
			loadNextClickCallback: function() {
				if(this.step < 5 && this.getCheckedValue() !== false) { // one of the buckets has been selected.
					appRouter.navigate("/step/"+ (this.step + 1), {
						trigger:true,
						replace:true
					});
				}
			},

			/**
			 * Fetch all of the bucket information and dynamically populate information
			 * into the view based on api feedback.
			 */
			render: function(number) {
				this.step = number;
				var _this = this;
				$.getJSON("/api/steps/load/?number="+ this.step, function(data) {
					_this.$el
						.html(_.template(stepHTML, {
							"title": _this.getTitle(),
							"buckets": data.response,
							"step": _this.step
						}))
						.attr("class", "step");

					$(".bucket").last().addClass("last");
				});
			}
		});
		
		return new stepView;
	}
);