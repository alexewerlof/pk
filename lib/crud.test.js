'use strict';

const { expect } = require('chai');
const operations = require('./operations');

describe('crud', () => {
    describe('hasKey', () => {
        expect(operations.hasKey({a: 1}, 'a')).to.be.true;
    });
});
