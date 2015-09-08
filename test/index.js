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
  , Config          = require( '../index' )

// New Squid Config instance
// Setup w/ `test` environnement
var SquidConfig = new Config( 'squid', './config/', _ENV )

// Test Core library
describe( 'test config library', function()
{
  it('Get environment', function()
  {
    SquidConfig
      .getEnv()
      .should
      .equal( _ENV )
  })

  it('Get the whole object', function()
  {
    var baseConfig =  Object.keys( SquidConfig.get() ).length

    baseConfig
      .should
      .equal( totalBaseConfig )
  })

  it('Get individual key', function()
  {
    SquidConfig
      .get('foo')
      .should
      .equal( testConfig.foo )
  })

  it('Get deep nested key', function()
  {
    SquidConfig
      .get('nested.key')
      .should
      .equal( appConfig.nested.key )
  })

  it('Get default value', function()
  {
    SquidConfig
      .get('fakekey', 'defaultValue')
      .should
      .equal( 'defaultValue' )
  })

  it('Set key', function()
  {
    SquidConfig.set( 'key', 'value' )

    SquidConfig
      .get( 'key' )
      .should
      .equal( 'value' )
  })

  it('Set object key', function()
  {
    SquidConfig.set('test', { key: 'code', foo: 'bar', nested: 'value'} )

    SquidConfig
      .get( 'test.key' )
      .should
      .equal( 'code' )
  })

  it('Unset key', function()
  {
    SquidConfig.set('test.key', false, {unset: true})

    assert.typeOf( SquidConfig.get('test.key'), 'undefined')
  })
})
