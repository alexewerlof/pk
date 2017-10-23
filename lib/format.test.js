const { expect } = require('chai');
const format = require('./format');

describe('format', () => {

    it('formats the objects correctly', () => {
        const obj = {
            foo: 'bar',
            baz: 'qux'
        };

        expect(format.object('an object', obj)).to.equal('an object:\nfoo: bar\nbaz:qux');
    });

    it('formats the arrays correctly', () => {

    });

});
