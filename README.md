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

Config required the Application's name (eg: `core`, `desktop`, etc.), the base path where files are stored. You can add a thrid argument to define the current environement. Finally you can define a last object that override the produced configuration, mostly for development need.

    var ConfigManager = require('squid-config')
      , SquidConfig   = new config( 'squid', './config/', 'test', { foo: 'local' } )



## Tests

    npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.2.0 Add local override
* 0.1.0 Initial release
