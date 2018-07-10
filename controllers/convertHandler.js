"use strict";

const round = x => Math.round(Math.round(x * 10 ** 6) / 10) / 10 ** 5;

function ConvertHandler () {

    this.getNum = function (input) {
        let output;

        const regex = /^(?:(\d+(?:\.\d+)?)(?:\/(\d+))?)?\w+$/;
        const inputData = regex.exec(input);
        if (!inputData) return null;
        const [, num, den] = inputData;

        if (num) {
            if (den) {
                const x = parseInt(den);
                if (x == 0) return null;
                output = parseFloat(num) / x;
            } else {
                output = parseFloat(num);
            }
            output = round(output);
        } else {
            if (den) {
                output = null;
            } else {
                output = 1;
            }
        }
        return output
    };

    this.getUnit = function (input) {
        const unitRegex = /(gal|L|lbs|kg|mi|km)$/;
        const data = unitRegex.exec(input);
        if (!data) return null;
        return data[1];
    };

    this.getReturnUnit = function (initUnit) {
        switch (initUnit) {
            case 'gal': return 'L';
            case 'L': return 'gal';

            case 'lbs': return 'kg';
            case 'kg': return 'lbs';

            case 'mi': return 'km';
            case 'km': return 'mi';
        }
    };

    this.spellOutUnit = function (unit) {
        switch (unit) {
            case 'gal': return 'gallons';
            case 'L': return 'liters';

            case 'lbs': return 'pounds';
            case 'kg': return 'kilograms';

            case 'mi': return 'miles';
            case 'km': return 'kilometers';
        }
    };

    this.convert = function (initNum, initUnit) {
        const gal2L = 3.78541;
        const lbs2Kg = 0.453592;
        const mi2Km = 1.60934;
        let output;

        switch (initUnit) {
          case 'gal':
            output = initNum * gal2L;
            break;
          case 'L':
            output = initNum / gal2L;
            break;

          case 'lbs':
            output = initNum * lbs2Kg;
            break;
          case 'kg':
            output = initNum / lbs2Kg;
            break;

          case 'mi':
            output = initNum * mi2Km;
            break;
          case 'km':
            output = initNum / mi2Km;
            break;
        }
        return round(output);
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        const output =
            `${initNum} ${this.spellOutUnit(initUnit)}` +
            ' converts to ' +
            `${returnNum} ${this.spellOutUnit(returnUnit)}`;
        return output
    };
}

module.exports = ConvertHandler;
