/**
 *  Test suite for dot-object-expander
 */

const expect = require ( 'chai' ).expect;
const dotObjectExpander = require ( '../src/parser' );

describe ( 'Dot Object Expander', () => {

    it ( 'should leave a normal object as it is', () => {

        const result = dotObjectExpander (
            {
                string : 'bar',
                int    : 123,
                float  : 1.234,
                boolean: true,
                obj    : {
                    foo: 'bar'
                },
                ary    : [ 1, 2, 3 ]
            }
        );

        expect ( result )
            .to
            .be
            .equal ( result );

    } );

    it ( 'should expand an object with top-level dotted keys', () => {

        const result = dotObjectExpander (
            {
                string   : 'bar',
                int      : 123,
                float    : 1.234,
                boolean  : true,
                'obj.foo': 'bar',
                ary      : [ 1, 2, 3 ]
            }
        );

        expect ( result )
            .to
            .have
            .nested
            .property ( 'obj.foo' );
        expect ( result.ary )
            .to
            .deep
            .equal ( [ 1, 2, 3 ] );

    } );

    it ( 'should expand an object with nested objects with dotted keys', () => {

        const result = dotObjectExpander (
            {
                string         : 'bar',
                int            : 123,
                float          : 1.234,
                boolean        : true,
                'obj.foo'      : {
                    'bar.baz': 123
                },
                'org.user.type': {
                    admin: {
                        'has.permissions.admin': true
                    },
                    ary  : [ 1, 2, 3 ]
                }
            }
        );

        expect ( result )
            .to
            .have
            .nested
            .property ( 'obj.foo.bar.baz' );
        expect ( result.obj.foo.bar.baz )
            .to
            .be
            .equal ( 123 );

        expect ( result )
            .to
            .have
            .nested
            .property ( 'org.user.type.admin.has.permissions.admin' );
        expect ( result.org.user.type.admin.has.permissions.admin ).to.be.true;

        expect ( result )
            .to
            .have
            .nested
            .property ( 'org.user.type.ary' );

        expect ( result.org.user.type.ary )
            .to
            .deep
            .equal ( [ 1, 2, 3 ] );

    } );

    it ( 'should throw an error when the object contains a circular reference', () => {
        try {

            const circular = {
                obj: {
                    foo: 'bar'
                }
            };

            circular.self = circular;

            const result = dotObjectExpander ( circular );

            expect ( result ).to.be.undefined;

        } catch ( e ) {
            expect ( e ).to.not.be.undefined;
            expect ( e.message )
                .to
                .not
                .be
                .equal ( 'Maximum call stack size exceeded' );
            expect ( e.message )
                .to
                .be
                .equal ( 'Cannot parse object with circular reference' );
        }
    } );

} );