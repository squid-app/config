/**
 * Squid Config
 *
 * A lightweight configuration class for Squid applications
 *
 * Get/Set methods are inspired by backbone-nested.js
 * https://github.com/afeld/backbone-nested
 *
 */

'use strict';

var _ = require('lodash')


var _LOGNAME = '[Config] '

// Initialize Config Class
//
//      @params  {mixed}   object or file path
//      @params  {mixed}   object or file path
//      @return  {object}  Config instance
//
function Config( defaults, extend, envName )
{
  // Constants
  // -------------

  // test instance uniqueness
  this._UID         = _.uniqueId('config_')

  this._DEFAULTENV  = 'default'


  // CORE's settings
  // ------------------------

  // default app configuration
  var confDefault = this.getConfigParam( defaults )
    , confExtend  = ( !_.isUndefined( extend ) )
                    ? this.getConfigParam( extend )
                    : {}

  this._ENV    = envName || this._DEFAULTENV
  this._CONFIG = _.merge(
        {}
      , confDefault
      , confExtend
    )

  return this
}


Config.prototype.getConfigParam = function( arg )
{
  if( _.isString( arg ) )
  {
    try
    {
      return require( arg )
    }
    catch( e ) { throw new Error( _LOGNAME + 'can not find config file ' + arg ) }
  }

  if( _.isObject( arg ) )
    return arg

  throw new Error( _LOGNAME + 'argument must be a valid file path or an object')
}

// Get Config environment
//
//      @return  {string}
//
Config.prototype.getEnv = function()
{
  return this._ENV
}

// Get Config item
//
//      @params  {string}  dot notation based key's path
//      @params  {string}  default value if not found
//      @return  {mixed}
//
Config.prototype.get = function( path, defaults )
{
  // no path asked,
  // return the whole config
  if( _.isUndefined( path ) )
    return this._CONFIG

  var fields = path.split('.')
    , result = this._CONFIG

  for( var i = -1, n = fields.length; ++i < n; )
  {
    result = result[ fields[ i ] ]

    if( result == 'undefined' && i < n - 1 )
        result = {}

    if( typeof result === 'undefined' )
        return result || defaults
  }

  return result
}


// Set a config value
//
//      @params  {string}  dot notation based key's path
//      @params  {string}  value to set
//      @params  {object}  unset key
//      @return  {object}  Config instance
//
Config.prototype.set = function( path, val, options )
{
  options = options || {}

  var fields = path.split('.')
    , result = this._CONFIG

  for( var i = -1, n = fields.length; ++i < n && result !== undefined; )
  {
    var field = fields[ i ]

    // If the last in the path, set the value
    if( i === n - 1 )
    {
      options.unset ? delete result[ field ] : result[ field ] = val
    }
    else
    {
      // Create the child object if it doesn't exist, or isn't an object
      if( typeof result[ field ] === 'undefined' || ! _.isObject( result[ field ] ) )
      {
        result[ field ] = {}
      }

      // Move onto the next part of the path
      result = result[ field ]
    }
  }

  return this
}

module.exports = Config
