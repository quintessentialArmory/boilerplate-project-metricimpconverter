'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
    const convertHandler = new ConvertHandler();

    app.route('/api/convert')
      .get(function (req, res) {
        const input = req.query.input;
        const initUnit = convertHandler.getUnit(input);
        const initNum = convertHandler.getNum(input);

        if (!initUnit) {
            if (!initNum) {
                res.status(403).send('invalid number and unit');
            } else {
                res.status(403).send('invalid unit');
            }
        } else if (!initNum) {
            res.status(403).send('invalid number');

        } else {
            const returnNum = convertHandler.convert(initNum, initUnit);
            const returnUnit = convertHandler.getReturnUnit(initUnit);
            const toString = convertHandler.getString(
                initNum,
                initUnit,
                returnNum,
                returnUnit,
            );

            res.json({
                initNum,
                initUnit,
                returnNum,
                returnUnit,
                string: toString,
            });
        }
    });
};
