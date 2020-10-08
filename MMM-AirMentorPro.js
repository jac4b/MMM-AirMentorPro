// Based on: 
// https://github.com/philippeportesppo/AirMentorPro2_SmartThings
// https://blog.truthlabs.com/beacon-tracking-with-node-js-and-raspberry-pi-794afa880318
// Correction at https://gist.github.com/eklimcz/b37c05b29d9ac7cdd040#file-gistfile1-js
// https://github.com/noble/noble




Module.register("MMM-AirMentorPro",{

	// Default module config.
	defaults: {
        text: "Hello World!",
        target: '', // 'ecf00e49334f';
        tvoc: 0
    },


	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
        // wrapper.innerHTML = "tvoc " + this.tvoc;
        wrapper.innerHTML = "tvoc " + this.config.tvoc;
        console.log("----------AirMentorPro debugging...")
        console.log(this.config.tvoc);
		return wrapper;
    },

    start: function () {

        // var tvoc = 1;

        setInterval(function(){

            // var xhr = new XMLHttpRequest();
            // xhr.overrideMimeType("application/json");
            // xhr.open("GET", file, true);
            // xhr.onreadystatechange = function () {
            //     if (xhr.readyState === 4 && xhr.status === 200) {
            //         callback(JSON.parse(stripComments(xhr.responseText)));
            //     }
            // };
            // xhr.send(null);


            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    console.log("---------" + xhr.responseText);
                    this.config.tvoc = xhr.responseText;
                }
            }
            xhr.open('GET', 'http://jeff.local:7000', true);
            xhr.send(null);




            // request('http://localhost:7000', function (error, response, body) {
            //     console.error('error:', error); // Print the error if one occurred
            //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //     console.log('-------------AirMentorPro body:', body); // Print the HTML for the Google homepage.
            //     this.config.tvoc = body;
            //     this.updateDom()
            // });
        }, 10000);

    },


    

});




