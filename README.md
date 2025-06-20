![status: archived](https://img.shields.io/badge/status-archived-inactive.svg)

> ⚠️ **This repository is archived and no longer maintained.**
>
> This project is discontinued and is provided as-is, with no support or updates.

# Dot Object Expander
A small module that expands object keys with dot notation into full objects.

It is a simple recursive wrapper around the [dot-object](https://github.com/rhalff/dot-object) library `dot.object`
 method. It also checks for circular references before attempting to parse.
 
>This was built primarily to parse API nested object queries into proper format for MongoDB, as some versions of MongoDB 
drivers do not support dot notation in key names.

[![CI Build](https://github.com/thefoot/dot-object-expander/workflows/ci-build/badge.svg)](https://github.com/thefoot/dot-object-expander/actions)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/thefoot/dot-object-expander)](https://github.com/TheFoot/dot-object-expander/releases)
[![npm (scoped)](https://img.shields.io/npm/v/@thefoot/dot-object-expander)](https://www.npmjs.com/package/@thefoot/dot-object-expander) 

## Installation

~~~
npm i @thefoot/dot-object-expander --save
~~~

## Usage

### NodeJS
```javascript
const dotObjectExpander = require ( '@thefoot/dot-object-expander' );

console.log( dotObjectExpander ( {
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
} ) );

// Result:
{
    "string": "bar",
    "int": 123,
    "float": 1.234,
    "boolean": true,
    "obj": {
        "foo": {
            "bar": {
                "baz": 123
            }
        }
    },
    "org": {
        "user": {
            "type": {
                "admin": {
                    "has": {
                        "permissions": {
                            "admin": true
                        }
                    }
                },
                "ary": [
                    1,
                    2,
                    3
                ]
            }
        }
    }
}

```
### ES Module
ES Module-aware environments such as Webpack and Rollup bundlers should automatically use the `dist/parser.esm.js` export.
```javascript
import dotObjectExpander from '@thefoot/dot-object-expander';

dotObjectExpander({
    'org.user.type': {
        admin: {
            'has.permissions.admin': true
        },
        ary  : [ 1, 2, 3 ]
    }
});
```

### Browser

#### Unminified with comments
```html
<script src="https://unpkg.com/dot-object-expander/dist/parser.js"></script>
<script>
    var parsed = dotObjectExpander({
        'org.user.type': {
            admin: {
                'has.permissions.admin': true
            },
            ary  : [ 1, 2, 3 ]
        }
    });
    // ...
</script>
```

#### Minified with source map
```html
<script src="https://unpkg.com/dot-object-expander/dist/parser.min.js"></script>
<script>
    var parsed = dotObjectExpander({
        'org.user.type': {
            admin: {
                'has.permissions.admin': true
            },
            ary  : [ 1, 2, 3 ]
        }
    });
    // ...
</script>
```

## Contributing
Contributions welcome, please read [CONTRIBUTING](docs/CONTRIBUTING.md) and [CODING-STANDARDS](docs/CODING-STANDARDS.md).

## Credits
[Rob Halff](https://github.com/rhalff) for his [dot-object](https://github.com/rhalff/dot-object) library.

### Author
- [@TheFoot](https://github.com/TheFoot)

### Contributors
- .

## Licence
[MIT](LICENCE.md)
