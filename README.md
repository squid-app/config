A lightweight configuration class for Squid applications.

## Configuration files

Configuration files are basic javascript object stored in a commun folder.

    'use strict';

    module.exports = {
        foo: 'baz'
      , nested:
        {
            key: 'value'
        }
    }


## usage

The class require an object or file' path that will be the default configuration. You can add a second object/file' path that will be merged with the default one.

    var ConfigManager = require('squid-config')
      , SquidConfig   = new config( './config/core', { foo: 'bar' } )

You can get a key by using dot notation or the whole configuration and provide a default value if key is undefined.

    var validKey     = SquidConfig.get('foo') // return bar
      , nestedKey    = SquidConfig.get('nested.key') // return value
      , defaultValue = SquidConfig.get('fakekey', 'defaultValue') // return defaultValue

You can update a key value or unset the key.

     // update key
    SquiqConfig.set( 'foo', 'oof' )

    // unset key
    SquiqConfig.set('nested', false, {unset: true})

## Tests

    npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.3.0 Major refactor
* 0.2.1 remove local override, fix default config reference
* 0.2.0 Add local override
* 0.1.0 Initial release
