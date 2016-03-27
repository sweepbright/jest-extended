var expect = require('expect');
var expectJSX = require('expect-jsx');

expect.extend(expectJSX);
expect.extend({

    /**
     * @param {*} expected
     *
     * @returns {expect}
     */
    toEqualJs: function(expected) {
        expect(this.actual.toJS()).toEqual(expected);

        return this;
    },

    /**
     * @param {Array} effects
     * @param {Boolean} looped
     *
     * @returns {expect}
     */
    toEqualSaga: function(effects, looped) {
        if (typeof effects === 'undefined') {
            effects = [];
        }

        var _this = this;
        var next = this.actual.next();

        effects.forEach(function(effect) {
            expect(next.value).toEqual(effect.action);
            next = _this.actual.next(effect.response);
        });

        // If we're looping this should return false.
        expect(next.done).toBe(!looped);

        return this;
    }

});

module.exports = expect;
