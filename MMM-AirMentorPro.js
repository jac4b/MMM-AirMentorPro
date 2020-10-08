Module.register("MMM-AirMentorPro",{

	// Default module config.
	defaults: {
        text: "Hello World!",
        target: '', // 'ecf00e49334f';
        
    },

    aqi: "",
    iaq: "",
    tvoc: "",
    co2: "",
    pm25: "",

    tvocColor: "",
    iaqColor: "",
    co2Color: "",
    pm25Color: "",


	// Override dom generator.
	getDom: function() {
        var wrapper = document.createElement("div");
        
        var tvocWrapper = document.createElement("div");
        var iaqWrapper = document.createElement("div");
        var co2Wrapper = document.createElement("div");
        var pm25Wrapper = document.createElement("div");



		// Style Wrappers
        // wrapper.className = "small ";

        //Parse Data
        var data = this.aqi;
        console.log(data);

        let id = data.slice(0,4);
        console.log(id);

        let firstName;
        let secondName;
        
        let firstData = parseInt(data.slice(4,8), 16);
        let secondData = parseInt(data.slice(16,), 16);
    
        let firstDesc;
        let secondDesc;
    
        if (id == 2221){
      
            firstName = 'TVOC';
            secondName = 'IAQ';

            if (firstData < 312) { firstDesc = "good"; this.tvocColor = ""; } else
            if (firstData < 560) { firstDesc = "moderate"; this.tvocColor = "yellow"; } else
            if (firstData < 1000) { firstDesc = "unhealthy"; this.tvocColor = "orange"; } else
            if (firstData < 3000) { firstDesc = "very unhealthy"; this.tvocColor = "red"; } else
            { firstDesc = "worst"; this.tvocColor = "purple"; };
        
            if (secondData < 50) { secondDesc = "good"; this.iaqColor = ""; } else
            if (secondData < 100) { secondDesc = "moderate"; this.iaqColor = "yellow"; } else
            if (secondData < 150) { secondDesc = "unhealthy"; this.iaqColor = "orange"; } else
            if (secondData < 200) { secondDesc = "very unhealthy"; this.iaqColor = "red"; } else
            { secondDesc = "worst"; this.iaqColor = "purple"; };

            this.tvoc = firstName + ': ' + firstData + ' ' + firstDesc;  
            this.iaq = secondName + ': ' + secondData + ' ' + secondDesc; 
        }
        else if (id == 2121){

            firstName = 'CO2';
            secondName = 'PM25';  

            secondData = secondData/1000;

            if (firstData < 800) { firstDesc = "good"; this.co2Color = "";  } else
            if (firstData < 1000) { firstDesc = "moderate"; this.co2Color = "yellow"; } else
            if (firstData < 2000) { firstDesc = "unhealthy"; this.co2Color = "orange";  } else
            if (firstData < 3000) { firstDesc = "very unhealthy"; this.co2Color = "red";  } else
            { firstDesc = "worst"; this.co2Color = "purple";  };
      
            if (secondData < 15.400) { secondDesc = "good"; this.pm25Color = ""; } else
            if (secondData < 40.400) { secondDesc = "moderate"; this.pm25Color = "yellow"; } else
            if (secondData < 65.500) { secondDesc = "unhealthy"; this.pm25Color = "orange"; } else
            if (secondData < 150.500) { secondDesc = "very unhealthy"; this.pm25Color = "red"; } else
            { secondDesc = "worst"; this.pm25Color = "purple"; };
       
            this.co2 = firstName + ': ' + firstData + ' ' + firstDesc;  
            this.pm25 = secondName + ': ' + secondData + ' ' + secondDesc; 
        }

        // iaqWrapper.innerHTML = this.iaq;
        tvocWrapper.innerHTML = this.tvoc;
        co2Wrapper.innerHTML = this.co2;
        pm25Wrapper.innerHTML = this.pm25;

        // iaqWrapper.className = this.iaqColor;
        tvocWrapper.className = this.tvocColor;
        co2Wrapper.className = this.co2Color;
        pm25Wrapper.className = this.pm25Color;

        // wrapper.appendChild(iaqWrapper);
        wrapper.appendChild(tvocWrapper);
        wrapper.appendChild(co2Wrapper);
        wrapper.appendChild(pm25Wrapper);

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




