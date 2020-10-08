Module.register("MMM-AirMentorPro",{

	// Default module config.
	defaults: {
        text: "Hello World!",
        target: '', // 'ecf00e49334f';
        
    },

    aqi: 0,

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
        wrapper.innerHTML = "AQI: " + this.aqi;
		return wrapper;
    },

    start: function () {

        var self = this;

        setInterval(function(){
            
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    console.log("--------- Received xhr: " + xhr.responseText);
                    self.aqi = xhr.responseText;
                }
            }
            xhr.open('GET', 'http://jeff.local:7000', true);
            xhr.send(null);
            self.updateDom();

        }, 10000);
    },

});




