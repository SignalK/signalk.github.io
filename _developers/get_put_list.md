---
title: Get, Put and List messages
layout: developers
developers: active
id: sp
---

## {{page.title}}

The `get`, `put` and `list` messages are json messages that provide stream connected clients (eg tcp, serial, or pub/sub protocols like MQTT/STOMP/WAMP or XMPP) with the same capabilities as REST GET, PUT and LIST requests.

In these cases the clients cannot use the REST interface as it assumes http(s) and a current connection. In many cases the connection will be intermittent, and the client will not have http(s) ability.

These messages are variations on the `updates`, `subscribe` and `unsubscribe` messages, using a similar delta format. The reply message will be different due to the async nature of the communication.

REST GET vs json get
====================
The `get` is functionally equivalent to a `subscribe`, receive first `updates` message, then `unsubscribe`. It is a request for just one current copy of the requested data. 

The REST api uses a GET call to obtain a specific subset of the signalk full tree, eg

`https://motu:8080/signalk/v1/api/vessels/self/navigation/position` returns the object at that location, since the request was synchronous it can be used to provide the context `vessels.self.navigation.position`

```
{
  "altitude": 0,
  "latitude": 37.81309475,
  "$source": "0183.serial0.GP.RMC",
  "longitude": -122.44721844,
  "timestamp": "2016-08-05T01:59:33.890Z"
}
```

The equivalent json message is:

```
{
  "context": "vessels.self",
  "get": [
     {
       "path": "navigation.position"
      }
   ]
}
```

which returns the same data, but in normal delta format. This is because the request was made asynchronously, hence it cannot give context to the response as in the REST interface:

```
{
	"context": "vessels.self.navigation",
	"updates": [{
		"values": [{
			"path": "position.longitude",
			"value": 173.1693
		}, {
			"path": "position.latitude",
			"value": -41.156426
		}, {
			"path": "position.altitude",
			"value": 0
		}],
		"source": "0183.serial0.GP.RMC",
		"timestamp": "2015-03-07T12:37:10.523+13:00"

	}]
}
```

REST PUT vs json put
====================
The `put` message concept is similar to the `updates` message. They differ primarily in their use. 

The `updates` are a periodic response to a `subscribe` message, the intent being that the subscriber has asked the target that it be notified of changes in various keys, and a change has occurred eg it can be viewed as a data event notification.

The `put` message is an explicit request by the caller to change the value of a key on the target to the provided value. Of course this may fail for security or other reasons, but the expectation is that the caller is setting the value on the target, not just notifying the target of the event.

A REST put is made by the HTTP PUT method. The context is from the url, the same as the `get` call: 
`https://motu:8080/signalk/v1/api/vessels/self/navigation/position`

The body contains the message.

```
{
  "values": [
	{
	  "path": "longitude",
	  "value": 173.1693
	}
   ]
}
```

The response will be an HTTP code ( 200, 404, etc)

For a json `put` message we use a format like `updates`:

```
{
	"context": "vessels.self",
	"put": [{
		"values": [{
			"path": "position.longitude",
			"value": 173.1693
		}]
	}]
}
```

There will be no response.

REST LIST vs json list
======================
The `list` message is a way to fing which keys a server knows about. Its optional, but may be helpful in some cases if you are trying to obtain a wide variety of data, eg for configuring an interface.

The REST list is done via a HTTP GET call to the REST API:
`http://localhost:8080/signalk/v1/api/list/vessels.self.navigation.position` and returns:

```
{
  "context": "vessels.self",
  "pathlist": [
    "vessels.self.navigation.position",
    "vessels.self.navigation.position.altitude",
    "vessels.self.navigation.position.latitude",
    "vessels.self.navigation.position.longitude"
  ]
}
```

The json list call is:

```
{
  "context": "vessels.self",
  "list": [
     {
	"path": "navigation.position"
     }
   ]
}
```

and returns the same result.
