module.exports = init

var Emitter = require('events').EventEmitter
  , Primus = require('primus')
  , PrimusEmitter = require('primus-emitter')
  , Socket = Primus.createSocket(
      { transformer: 'websockets'
      , parser: 'JSON'
      , plugin: { emitter: PrimusEmitter }
      })

function init(callback) {
  callback(null, 'benqProjector', BenqProjector)
}

function BenqProjector(automait, logger, config) {
  Emitter.call(this)
  this.automait = automait
  this.logger = logger
  this.config = config
  this.client = new Socket(config.connString)
}

BenqProjector.prototype = Object.create(Emitter.prototype)

BenqProjector.prototype.init = function () {
  startListening.call(this)
}

function startListening() {
  this.client.on('on', function () {
    this.emit('on')
  }.bind(this))

  this.client.on('off', function () {
    this.emit('off')
  }.bind(this))
}
