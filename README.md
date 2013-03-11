# locmsg

Use localStorage as a pub/sub system across tabs/windows

Inspired by the thoughts [here](http://bens.me.uk/2013/localstorage-inter-window-messaging),
but not including the mutex lock mentioned [here](http://balpha.de/2012/03/javascript-concurrency-and-locking-the-html5-localstorage/)


## Simple Interface

locmsg exports one global: `locmsg`

```javascript
locmsg.publish('channel-name', {any: ['value', 'here']})

locmsg.subscribe('channel-name', function(msg) { console.log('just received', msg) })
```

That's really all there is to it. There are a few more exports for convenience:

```javascript
locmsg._parse(localStorage['channel-name'])     // returns [<window_id>, <msg_value>]

var myVar = window.locmsg.noConflict()          // just like jQuery
```


## Caveats

If messages are broadcast on the same channel _very_ close together, you could see some
corruption, as mentioned [here](http://balpha.de/2012/03/javascript-concurrency-and-locking-the-html5-localstorage/)


## TODO

tests

