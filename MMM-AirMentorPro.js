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
        console.log("AirMentorPro debugging...")
        console.log(this);
		return wrapper;
    }
    

});




