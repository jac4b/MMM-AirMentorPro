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
        
    },

    tvoc: 0,

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
        // wrapper.innerHTML = "tvoc " + this.tvoc;
        wrapper.innerHTML = "tvoc " + this.tvoc;
        console.log("----------AirMentorPro debugging...")
        console.log(this.tvoc);
        console.log(this);
		return wrapper;
    },

    start: function () {

        // var tvoc = 1;
        var self = this;

        setInterval(function(){
            
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    console.log("---------Received xhr: " + xhr.responseText);
                    // this.tvoc = xhr.responseText;
                    self.tvoc = xhr.responseText;
                    console.log(this);
                    console.log(self);
                }
            }
            xhr.open('GET', 'http://jeff.local:7000', true);
            xhr.send(null);
            self.updateDom();


        }, 10000);

    },


    

});




