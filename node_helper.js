/* Magic Mirror
 * Node Helper: Calendar
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");

const noble = require("noble");


module.exports = NodeHelper.create({

    start: function () {
        console.log('MMM-AirMentorPro registered');
        // this.tvoc = 0;

        noble.startScanning();
        // setInterval(function(){noble.stopScanning();noble.startScanning();}, 5000);

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
                console.log('tvoc ' + tvoc);
                // console.log('iaq ' + iaq);	

                this.config.tvoc = _tvoc;
                // iaq = _iaq;

                this.updateDom();

            }

        });

        
    },
    
    




    

});
