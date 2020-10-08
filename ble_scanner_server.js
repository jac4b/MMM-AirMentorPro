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

  
    aqi = data; 

  }


});