/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      const input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });
    
    test('Decimal Input', function(done) {
      const input = '0.4mi';
      assert.equal(convertHandler.getNum(input), 0.4);
      done();
    });
    
    test('Fractional Input', function(done) {
      const input = '1/7lbs';
      assert.equal(convertHandler.getNum(input), 0.14286);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      const input = '5.5/3km';
      assert.equal(convertHandler.getNum(input), 1.83333);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      const input = '3/2.1/4km';
      assert.isNull(convertHandler.getNum(input));
      done();
    });
    
    test('No Numerical Input', function(done) {
      const input = '.2km';
      assert.isNull(convertHandler.getNum(input));
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const x = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      x.forEach(function(ele) {
        assert.isNotNull(convertHandler.getUnit(ele));
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      const input = ['ga','lt','m','kilo','lb','g'];
      input.forEach(function(ele) {
        assert.isNull(convertHandler.getUnit(ele));
      });
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg'];
      const expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg'];
      const expect = [
        'gallons',
        'liters',
        'miles',
        'kilometers',
        'pounds',
        'kilograms',
      ];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      const input = [5, 'gal'];
      const expected = 18.9271;
      const output = convertHandler.convert(input[0],input[1]);
      assert.approximately(output,expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      const input = [2.1, 'l'];
      const expected = 0.55476;
      const output = convertHandler.convert(input[0],input[1]);
      assert.approximately(output,expected,0.000005); //0.000005 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      const input = [243, 'mi'];
      const expected = 391.07059;
      const output = convertHandler.convert(input[0],input[1]);
      assert.approximately(output,expected,0.000005); //0.000005 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      const input = [76, 'km'];
      const expected = 47.22421;
      const output = convertHandler.convert(input[0],input[1]);
      assert.approximately(output,expected,0.000005); //0.000005 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      const input = [5.6, 'lbs'];
      const expected = 2.54012;
      const output = convertHandler.convert(input[0],input[1]);
      assert.approximately(output,expected,0.000005); //0.000005 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      const input = [1.25, 'kg'];
      const expected =  2.75578;
      const output = convertHandler.convert(input[0],input[1]);
      assert.approximately(output,expected,0.000005); //0.000005 tolerance
      done();
    });
    
  });

});