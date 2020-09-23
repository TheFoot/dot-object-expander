/**
 * A recursive object parser that expands keys with dot notation.
 * @module dot-object-expander
 */
const dot = require ( 'dot-object' );

const parseIt = obj => {

    // Check for circular reference
    let parsed;
    try {
        parsed = JSON.parse ( JSON.stringify ( obj ) );
    } catch ( e ) {
        throw new Error ( 'Cannot parse object with circular reference' );
    }

    // Process dotted keys at top-level
    parsed = dot.object ( parsed );

    // Find child objects
    for ( const [ key, value ] of Object.entries ( parsed ) ) {

        // Process an object recursively
        if ( typeof value === 'object' ) {
            parsed[ key ] = parseIt ( value );
        }

    }

    return parsed;

};

module.exports = obj => parseIt ( obj );