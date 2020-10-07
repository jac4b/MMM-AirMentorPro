/* Magic Mirror
 * Node Helper: Calendar
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");

// const noble = require("noble");
// const BeaconScanner = require("node-beacon-scanner");

const request = require('request');


module.exports = NodeHelper.create({

    start: function () {

        setInterval(function(){
            request('http://localhost:7000', function (error, response, body) {
                console.error('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
            });
        }, 10000);

        // console.log("------------testing BeaconScanner")
        // var scanner = new BeaconScanner();

        // scanner.onadvertisement = (advertisement) => {
        //     var beacon = advertisement["iBeacon"];
        //     beacon.rssi = advertisement["rssi"];
        //     console.log("--------onadvertisement")
        //     console.log(JSON.stringify(beacon, null, "    "))
        // };
        
        // scanner.startScan().then(() => {
        //     console.log("Scanning for BLE devices...")  ;
        // }).catch((error) => {
        //     console.error(error);
        // });



        // console.log('MMM-AirMentorPro registered');
        // // this.tvoc = 0;

        // // noble.startScanning();
        // setInterval(function(){
        //     console.log('-------AirMentorPro setInterval running');
        //     noble.startScanning([], false);
        //     noble.on('stateChange', function(state) {
        //         console.log('-------noble state changed')
        //             if (state === 'poweredOn') {
        //               noble.startScanning([], false);
        //             }
        //     });
        
        // }, 10000);

        // noble.on('stateChange', function(state) {
        //     if (state === 'poweredOn') {
        //       noble.startScanning([], true);
        //     }
        //   });
        
        // noble.on('stateChange', function(state) {
        //     if (state === 'poweredOn')
        //       noble.startScanning();
        //     else
        //       noble.stopScanning();
        // });

        // noble.on('discover', function(peripheral) {
        //     let macAddress = peripheral.uuid;
        //     let rssi = peripheral.rssi;
        //     let localName = peripheral.advertisement.localName;


        //     console.log('found device: ', macAddress, ' ', localName, ' ', rssi);

        //     if (localName == 'Air Mentor Pro' || macAddress == target){
        //         let data = peripheral.advertisement.manufacturerData.toString('hex');
        //         console.log(data);

        //         let _tvoc = parseInt(data.slice(4,8), 16);
        //         let _iaq = parseInt(data.slice(16,), 16);
        //         console.log('tvoc ' + tvoc);
        //         // console.log('iaq ' + iaq);	

        //         this.config.tvoc = _tvoc;
        //         // iaq = _iaq;

        //         this.updateDom();

        //     }

        // });

        
    },
    
    




    

});
