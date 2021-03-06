define([
	"jquery",
	"underscore",
	"backbone",
	'text!templates/home.html'
	], function($, _, Backbone, homeHTML){
		var homeView = Backbone.View.extend({
			el: "#content",
			user: false,

			events: {
				"click #getStarted": "getStartedClickCallback",
				"click #login": "loginClickCallback"
			},

			getStartedClickCallback: function() {
				this.user.set({loggedIn: true});
				appRouter.navigate(fbkUrlroot +"questions/1", {
					trigger:true,
					replace:true
				});
			},

			/**
			 * Handle the login prompt when the user clicks to 
			 * login with FB.
			 */
			loginClickCallback: function() {
				window.parent.location = "https://graph.facebook.com/oauth/authorize?client_id=111378102282619&redirect_uri=https://apps.facebook.com/ferguson_recommends";
				/*var _this = this;
				FB.login(function(response) {
					console.log(response);
			        if (response.authResponse) {
			    		_this.user.populate();
			    		_this.getStartedClickCallback();
			        }
			    });*/
			},

			/**
			 * Show the get started button.
			 */
			onLoggedInUser: function() {
				$("#login").hide();
				$("#getStarted").css("display", "block");
			},

			/**
			 * Render this view;
			 * Add content and present the proper button.
			 */
			render: function(usr) {
				this.user = usr;
				this.$el
					.html(_.template(homeHTML, {
						name: "Home",
						domain: fbkUrlroot
					}))
					.attr("class", "home");

				// Either get logged in user or provide the login link.
				if(this.user.isLoggedIn()) {
					this.onLoggedInUser();
				}
			}
		});
		
		return new homeView;
	}
);