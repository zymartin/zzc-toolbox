const chai = require( 'chai' );
const assert = chai.assert;
const expect = chai.expect;

function add( a, b ) {
    return a + b;
}

var foo = 'bar'
    , beverages = { tea: ['chai', 'matcha', 'oolong'] };




describe( '测试：b.js', function () {
    it( '1 加 1 应该等于 2', function () {
        expect( add( 1, 1 ) ).to.be.equal( 2 );
    } );
    it( '1 加 1 应该等于 2', function () {
        expect( true ).to.equal( true );
    } );
} );