// Sandbox file for dev

var _PATH = './index'
var _ = require('lodash')

var customConfig = {
    foo: 'the foobar test'
}

// Instance
var config = require( _PATH )
  , squid  = new config( './config/squid', customConfig, 'desktop') //, 'My config object' )

console.log(squid.getEnv())
console.log(squid.get())

// return
var baseConfig =  Object.keys( squid.get() ).length

console.log(baseConfig)
console.log(squid.get())
console.log(Object.keys( squid.get() ).length)
// return
console.log(squid.get('nested.key'))
// return
console.log(squid.get('github.repo'))
console.log(squid.get('github.repo', 'test'))
// return

squid.set('test', { key: 'code', foo: 'bar', nested: 'value'})
console.log(squid.get('test.key'))

var complet = squid.get()
  , total   = Object.keys( complet ).length
console.log(complet)
console.log(total)

squid.set('test.key', false, {unset: true})
console.log(squid.get('test.key'))
console.log(squid.get())

console.log( typeof squid.get( 'test.key' ) )
