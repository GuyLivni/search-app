var person = require('../models/person')();

module.exports = function () {

    var handleSearch = function (res,req) {

        var age       = req.query.age;
        var name      = req.query.name;
        var phone     = req.query.phone;
        var pageSize  = req.query.pageSize  || 20;
        var pageIndex = req.query.pageIndex || 1;

        var result = person.getPerson(name, phone, age, pageSize, pageIndex);
        res.send(result);
    };

    return {
        handleSearch : handleSearch
    }

};