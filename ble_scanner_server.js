// Based on: 
// https://github.com/philippeportesppo/AirMentorPro2_SmartThings (Python)
// https://blog.truthlabs.com/beacon-tracking-with-node-js-and-raspberry-pi-794afa880318


var tvoc = '0';
const http = require('http');

const requestListener = function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200); 
  var text = "tvoc " + tvoc;
  res.end(text);
}

const server = http.createServer(requestListener);
server.listen(7000);


const noble = require('noble');
const target = '';
// const target = 'ecf00e49334f';

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

    let _tvoc = parseInt(data.slice(4,8), 16);
    let _iaq = parseInt(data.slice(16,), 16);
    console.log('tvoc ' + _tvoc);
    console.log('iaq ' + _iaq); 
    
    tvoc = _tvoc;







    // console.log(peripheral); 

    // console.log(peripheral.state);
    // noble.stopScanning();
    // peripheral.connect(function() {

  //         peripheral.discoverAllServicesAndCharacteristics(function(error, services, characteristics){

  //           if (!error) {
  //               console.log("[---") 
  //               console.log("Services: \n" + "["+services+"]")
  //               console.log("Characteristics: \n" + "[" + characteristics + "]")
  //               console.log("---]")

  //               var chrRead
  //               var chrWrite
  //              services.forEach(function(s, serviceId) {
  //                 if (s.uuid == settings.UART) {
  //                   s.characteristics.forEach(function(ch, charId) {
                        
  //                     if (ch.uuid === settings.RX) {
  //                       chrRead = ch
  //                     } else if (ch.uuid === settings.TX) {
  //                       chrWrite = ch
  //                     }
  //                   })
  //                 }
  //               })

  //             if (chrRead != null && chrWrite != null) {
  //               ready(chrRead, chrWrite)
  //             } else {
  //               console.log("no UART service/charactersitics found...")
  //             }
  //           } else {
  //             console.log(error)
  //           }
              
  //         })
  //      })





  }


});