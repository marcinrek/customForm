import * as cF from './customForm.functions';

var assert = require('assert');

describe('compareArrays()', function () {
    it('["1","2","3"] === ["1","2","3"]', function () {
        assert.equal(true, cF.compareArrays(["1", "2", "3"], ["1", "2", "3"]));
    });
    it('[""] === [""]', function () {
        assert.equal(true, cF.compareArrays([""], [""]));
    });
    it('["3","2","1"] !== ["1","2","3"]', function () {
        assert.equal(false, cF.compareArrays(["3", "1", "1"], ["1", "2", "3"]));
    });
    it('["1","2","3"] !== ["1","2"]', function () {
        assert.equal(false, cF.compareArrays(["1", "2", "3"], ["1", "2"]));
    });
});
