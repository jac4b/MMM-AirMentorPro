// Based on: 
// https://github.com/philippeportesppo/AirMentorPro2_SmartThings (Python)
// https://blog.truthlabs.com/beacon-tracking-with-node-js-and-raspberry-pi-794afa880318


var aqi = '0';
const http = require('http');

const requestListener = function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200); 
  var text = aqi;
  res.end(text);
}

const server = http.createServer(requestListener);
server.listen(7000);


const noble = require('noble');
const target = '';  // pass your macAddress here e.g. ecf00e49334f if device name isn't Air Mentor Pro

noble.startScanning();
setInterval(function(){noble.stopScanning();noble.startScanning();}, 15000);

noble.on('discover', function(peripheral) {
  let macAddress = peripheral.uuid;
  let rssi = peripheral.rssi;
  let localName = peripheral.advertisement.localName;


  console.log('found device: ', macAddress, ' ', localName, ' ', rssi);

  if (localName == 'Air Mentor Pro' || macAddress == target){
    let data = peripheral.advertisement.manufacturerData.toString('hex');
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
      if (firstData < 312) { firstDesc = "good" } else
      if (firstData < 560) { firstDesc = "moderate" } else
      if (firstData < 1000) { firstDesc = "unhealthy" } else
      if (firstData < 3000) { firstDesc = "very unhealthy" } else
      { firstDesc = "worst" };

      if (secondData < 50) { secondDesc = "good" } else
      if (secondData < 100) { secondDesc = "moderate" } else
      if (secondData < 150) { secondDesc = "unhealthy" } else
      if (secondData < 200) { secondDesc = "very unhealthy" } else
      { secondDesc = "worst" };

      firstName = 'TVOC';
      secondName = 'IAQ';
    }
    else {
      if (firstData < 800) { firstDesc = "good" } else
      if (firstData < 1000) { firstDesc = "moderate" } else
      if (firstData < 2000) { firstDesc = "unhealthy" } else
      if (firstData < 3000) { firstDesc = "very unhealthy" } else
      { firstDesc = "worst" };

      if (secondData < 15400) { secondDesc = "good" } else
      if (secondData < 40400) { secondDesc = "moderate" } else
      if (secondData < 65500) { secondDesc = "unhealthy" } else
      if (secondData < 150500) { secondDesc = "very unhealthy" } else
      { secondDesc = "worst" };

      firstName = 'CO2';
      secondName = 'PM25';   
    }

    // aqi = firstName + ': ' + firstData + ' ' + firstDesc + ' | ' + secondName + ': ' + secondData + ' ' + secondDesc;  
    // console.log(aqi);   
    aqi = data; 

  }


});