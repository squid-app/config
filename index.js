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

// Initialize Config Class
//
//      @params  {string}  app name
//      @params  {string}  base path to config files
//      @params  {string}  target env
//      @params  {object}  local config override
//      @return  {object}  Config instance
//
var Config = function( app, path, env, override )
{
  path = path || false
  env  = env || 'default'

  if( _.isUndefined( app ) )
    throw new Error( '[Config] need app name' )

  if( !path )
    throw new Error( '[Config::' + app + '] need a base path to load config files' )

  if( path.substr(-1) !== '/' )
    path = path + '/'

  // CORE's settings
  // ------------------------

  try // default app config
  {
    var confDefault = require( path + app )
  }
  catch( e ) { throw new Error( '[Config::' + app + '] can not find default config' ) }

  try // env based config
  {
    var confEnv = require( path + env )
  }
  catch( e ) { throw new Error( '[Config::' + app + '] can not find env config' ) }

  this._ENV    = env
  this._CONFIG = _.merge(
        confDefault
      , confEnv
      , override || {}
    )

  return this
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
