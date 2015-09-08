A lightweight configuration class for Squid applications.

## Configuration files

Configuration files are basic javascript object stored in a commun folder. There are two required files, `default.js` and `app.js` where `app` is the current application name.

    'use strict';

    module.exports = {
        foo: 'baz'
      , nested:
        {
            key: 'value'
        }
    }


## usage

Config required the Application's name (eg: `core`, `desktop`, etc.), the base path where files are stored. You can add a thrid argument to define the current environement

    var ConfigManager = require('squid-config')
      , SquidConfig   = new config( 'squid', './config/', 'test' )
      
      

## Tests

    npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release