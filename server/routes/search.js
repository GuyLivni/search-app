var searchService = require('../services/search.service')();
var validate = require('express-validation');
var Joi = require('joi');

module.exports = function(app){
    app.get('/search', validate({
        query: {
            name:  Joi.string().regex(/^[a-zA-Z\.]+$/),
            age:   Joi.number().integer().min(1).max(120),
            phone: Joi.string().alphanum().min(3)
        }
    }),function (req, res) {
        searchService.handleSearch(res, req);
    })
};