;(function() {

var LOCMSG = {}
  , __locmsg = window.locmsg
  , ID = parseInt(Date.now() * Math.random(), 10)
  , __evtHandlers = {} 



//~ Main Public Interface ~//

function publish(channel, val) {
  _localChange(channel, val)                    // reflect the change locally
  localStorage.setItem(channel, _mkMsg(val))    // ... then broadcast it
}

function subscribe(channel, fn) {
  (__evtHandlers[channel] || (__evtHandlers[channel] = [])).push(fn)
}

function noConflict() {
  window.locmsg = __locmsg
  return LOCMSG
}

window.locmsg = LOCMSG = {
   publish: publish
  ,subscribe: subscribe
  ,noConflict: noConflict
  ,_parse: _parseMsg
  ,_mk: _mkMsg
}



//~ Helper Functions ~//

function _parseMsg(msg) {
  var spl = msg.split('~')
  return [spl[0], spl.slice(1).join('~')]
}

function _mkMsg(rawVal) { return [ID, rawVal].join('~') }
function _msgID(msg) { return _parseMsg(msg)[0] }
function _msgVal(msg) { return _parseMsg(msg)[1] }
function _ownMsg(msg, force) { return _msgID(msg) == ID }

function _handleUpdate(key, val) {
  if (__evtHandlers[key])
    for (var i=0; i < __evtHandlers[key].length; i++)
      __evtHandlers[key][i](val);
}

function _remoteChange(evt) {
  console.log('hotdog')
  if (! _ownMsg(evt.newValue)) 
    _handleUpdate(evt.key, _msgVal(evt.newValue));
}

function _localChange(channel, rawVal) {
  _handleUpdate(channel, rawVal)
}



window.addEventListener('storage', _remoteChange)


}());
