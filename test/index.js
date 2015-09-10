/**
 * Squid Config
 *
 * Unit Test
 *
 */

var chai            = require('chai')
  , should          = chai.should()
  , expect          = chai.expect
  , assert          = chai.assert
  , appConfig       = require('../config/squid')  // App config file
  , testConfig      = require('../config/test')  // Test config file
  , totalBaseConfig = Object.keys( appConfig ).length
  , _ENV            = 'test'
  , _CUSTOMNAME     = 'My config object'
  , Config          = require( '../index' )
  , overrideConfig  = { localSettings: true }
  , namedConfig     = { someSettings: false, customEnvName: _CUSTOMNAME }

// New Squid Config instance
// Setup w/ `test` environnement
var ConfigFile       = new Config( 'squid', './config/', _ENV )
  , ConfigOverride   = new Config( 'squid', './config/', overrideConfig )
  , OverrideWithName = new Config( 'squid', './config/', namedConfig )

// Test Core library
describe( 'test config library', function()
{
  it('Get config environment from files', function()
  {
    ConfigFile
      .getEnv()
      .should
      .equal( _ENV )
  })

  it('Get override config without name ', function()
  {
    ConfigOverride
      .getEnv()
      .should
      .equal( ConfigOverride._CUSTOMENVNAME )
  })

  it('Get override config with name ', function()
  {
    OverrideWithName
      .getEnv()
      .should
      .equal( _CUSTOMNAME )
  })

  it('Get the whole object', function()
  {
    var baseConfig = Object.keys( ConfigFile.get() ).length

    baseConfig
      .should
      .equal( totalBaseConfig )
  })

  it('Get individual key', function()
  {
    ConfigFile
      .get('foo')
      .should
      .equal( testConfig.foo )
  })

  it('Get individual key from custom', function()
  {
    ConfigOverride
      .get('localSettings')
      .should
      .equal( overrideConfig.localSettings )
  })

  it('Get deep nested key', function()
  {
    ConfigFile
      .get('nested.key')
      .should
      .equal( appConfig.nested.key )
  })

  it('Get default value', function()
  {
    ConfigFile
      .get('fakekey', 'defaultValue')
      .should
      .equal( 'defaultValue' )
  })

  it('Set key', function()
  {
    ConfigFile.set( 'key', 'value' )

    ConfigFile
      .get( 'key' )
      .should
      .equal( 'value' )
  })

  it('Set object key', function()
  {
    ConfigFile.set('test', { key: 'code', foo: 'bar', nested: 'value'} )

    ConfigFile
      .get( 'test.key' )
      .should
      .equal( 'code' )
  })

  it('Unset key', function()
  {
    ConfigFile.set('test.key', false, {unset: true})

    assert.typeOf( ConfigFile.get('test.key'), 'undefined')
  })
})
