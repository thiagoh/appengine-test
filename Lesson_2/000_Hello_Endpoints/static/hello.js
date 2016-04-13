(function(argument) {

	'use strict';

	/*
	 * http://stackoverflow.com/questions/18260815/use-gapi-client-javascript-to-execute-my-custom-google-api
	 * https://developers.google.com/appengine/docs/java/endpoints/consume_js
	 * https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientload
	 *
	 */

	/**
	 * After the client library has loaded, this init() function is called.
	 * The init() function loads the helloworldendpoints API.
	 */

	function init() {

		// You need to pass the root path when you load your API
		// otherwise calls to execute the API run into a problem

		// rootpath will evaulate to either of these, depending on where the app is running:
		// //localhost:8080/_ah/api
		// //your-app-id/_ah/api

		var rootpath = "//" + window.location.host + "/_ah/api";

		// Load the helloworldendpoints API
		// If loading completes successfully, call loadCallback function
		gapi.client.load('helloworldendpoints', 'v1', function() {

			/*
			 * When helloworldendpoints API has loaded, this callback is called.
			 * 
			 * We need to wait until the helloworldendpoints API has loaded to
			 * enable the actions for the buttons in index.html,
			 * because the buttons call functions in the helloworldendpoints API
			 */
			// Enable the button actions
			enableButtons();

			console.log('loaded!');

		}, rootpath);

		console.log('initted!');
	}

	window.init = init;

	function enableButtons() {

		var btn1 = document.getElementById("input_greet_generically");
		btn1.value = "Click me for a generic greeting";
		
		var btn2 = document.getElementById("input_greet_by_name");
		btn2.value = "Click me for a personal greeting";

		var btn3 = document.getElementById("input_age");
		btn3.value = "Click me for a personal greeting about your age";

		btn1.onclick = function() {

			/*
			 * Execute a request to the sayHello() endpoints function
			 */
			// Construct the request for the sayHello() function
			var request = gapi.client.helloworldendpoints.sayHello();

			// Execute the request. On success, pass the response to sayHelloCallback()
			request.execute(sayHelloCallback);
		};

		// Set the onclick action for the second button
		btn2.onclick = function() {

			/*
			 * Execute a request to the sayHelloByName() endpoints function.
			 * Illustrates calling an endpoints function that takes an argument.
			 */
			// Get the name from the name_field element
			var name = document.getElementById("name_field").value;

			// Call the sayHelloByName() function.
			// It takes one argument "name"
			// On success, pass the response to sayHelloCallback()
			var request = gapi.client.helloworldendpoints.sayHelloByName({
				'name': name
			});

			request.execute(sayHelloCallback);
		};

		// Set the onclick action for the second button
		btn3.onclick = function() {

			/*
			 * Execute a request to the sayHelloWithAge() endpoints function.
			 * Illustrates calling an endpoints function that takes an argument.
			 */
			// Get the name from the name_field element
			var age = document.getElementById("age_field").value;

			// Call the sayHelloWithAge() function.
			// It takes one argument "name"
			// On success, pass the response to sayHelloCallback()
			var request = gapi.client.helloworldendpoints.sayHelloWithAge({
				'age': age
			});

			request.execute(function(response) {
				alert(response.greeting);
			});
		};
	}

	// Process the JSON response
	// In this case, just show an alert dialog box
	// displaying the value of the message field in the response
	function sayHelloCallback(response) {
		alert(response.greeting);
	}
}());