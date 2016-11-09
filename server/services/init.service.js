var fs = require('fs');
var personModel = require('../models/person')();

module.exports = function () {

    var init = function () {
        fs.readFile('./data/people.json', function (err, data) {

            if (err) {
                throw err;
            }

            personModel.setSearchData(JSON.parse(data));
        });
    };

    return {
        init : init
    }

};