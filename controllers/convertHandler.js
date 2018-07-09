/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {

    const numRegex = /^(?:(\d+(?:\.\d+)?)(?:\/(\d)+))?\w+$/;
    var inputData = numRegex.exec(input);
    if (!inputData) return null;
    var [, num, den] = inputData;

    if (num) {

      if (den) return parseFloat(num)/parseInt(den);
      return parseFloat(num);
    }

    else return null
  };
  
  this.getUnit = function(input) {

    const unitRegex = /(gal|L|lbs|kg|mi|km)$/;
    var data = unitRegex.exec(input);
    if (!data) return null;
    return data[1];
  };
  
  this.getReturnUnit = function(initUnit) {

    switch (initUnit) {

      case 'gal': return 'L';
      case 'L': return 'gal';

      case 'lbs': return 'kg';
      case 'kg': return 'lbs';

      case 'mi': return 'km';
      case 'km': return 'mi';
    }
  };

  this.spellOutUnit = function(unit) {

    switch (initUnit) {

      case 'gal': return 'gallons';
      case 'L': return 'liters';

      case 'lbs': return 'pounds';
      case 'kg': return 'kilograms';

      case 'mi': return 'miles';
      case 'km': return 'kilometers';
    }
  };
  
  this.convert = function(initNum, initUnit) {

    const gal2L = 3.78541;
    const lbs2Kg = 0.453592;
    const mi2Km = 1.60934;

    switch (initUnit) {

      case 'gal': return initNum*gal2L;
      case 'L': return initNum/gal2L;

      case 'lbs': return initNum*lbs2Kg;
      case 'kg': return initNum/lbs2Kg;

      case 'mi': return initNum*mi2Km;
      case 'km': return initNum/mi2Km;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    initUnit = this.spellOutUnit(initUnit);
    returnUnit = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
  
}

module.exports = ConvertHandler;
