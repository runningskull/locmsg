;(function() {


var now = Date.now || function(){ return +new Date() }

function throttle(fn, delay) {
  var last = now()
    , timer

  return function() {
    var args=arguments, ctx=this
      , _fn = function(){ fn.apply(ctx, args) }

    if (now() - last >= delay) {
      last = now()
      fn.apply(this, arguments)
    } else {
      timer && clearTimeout(timer);
      timer = setTimeout(_fn, delay)
    }
  }
}


function render(val) {
  display.innerText = val || locmsg._parse(localStorage.STATUS || '~ ')[1]
}

var update = throttle(function(evt) {
  locmsg.publish('STATUS', input.value)
}, 250)


var elid = document.getElementById.bind(document)
  , display = elid('display')
  , input = elid('msg')
  
input.addEventListener('keyup', update)
locmsg.subscribe('STATUS', render)

render()


}());

