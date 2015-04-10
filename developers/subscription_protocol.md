---
title: Subscription Protocol
layout: rsidebar
sidebar: sidebar.html
id: sp
---

## {{page.title}}

### Introduction

By default a Signal K server will provide a new WebSockets client with an empty delta stream, once per second. eg
`/signalk/stream` will provide the delta stream, every 1 sec.

```json
{
  "context": "vessels",
   "updates": []
}
```
> Below we refer to websockets, but the same process works in the same way over any transport eg for a raw TCP connection
> the connection causes the above message to be sent, and sending the subscribe messages will have the same effect as
> described here.

This is a fairly useless message, but provides a heartbeat while you subscribe to parts of the model that are of
interest.

In most use cases you do not want the whole update stream but part thereof. A subscription to the required criteria is
made by sending a json message over the websocket.

```json
{
  "context": "vessels.230099999",
  "subscribe": [
    {
      "path": "navigation.speedThroughWater",
      "period": 1000,
      "format": "delta",
      "policy": "ideal",
      "minPeriod": 200
    },
    {
      "path": "navigation.logTrip",
      "period": 10000
    }
  ],
  "unsubscribe": [
    {
      "path": "environment.depth.belowTransducer",
    }
  ]
}
```

* `path=[path.to.key]` is appended to the context to specify subsets of the context. The path value can use jsonPath
  syntax.
* `period=[millisecs]` becomes the transmission rate, eg every `period/1000` seconds.
* `format=[delta|full]` specifies delta or full format. Delta format is provided by default
* `policy=[instant|ideal|fixed]`.
 * `instant` means send all changes as fast as they are received, but no faster than `minPeriod`. By default the reply
   to this policy will contain the current data for the subscription so that the client has an immediate copy of the
   current state of the server.
 * `ideal` means use `instant` policy, but if no changes are received before `period`, then resend the last known
   values.
 * `fixed` means simply send the last known values every period. This is the default.
* `minPeriod=[millisecs]` becomes the fastest transmission rate allowed, eg every `minPeriod/1000` seconds. This is only
  relevant for policy='instant' below to avoid swamping the client.

> **Teppo**: to me `minPeriod` is confusing. `minimumInterval` would be my suggestion. That way we would have periodic
> or throttled-by-minimum-interval subscriptions. BTW why do we need `policy` if it is in effect specified by `period`
> xor `minPeriod`/`minInterval`? My suggestion: `period` xor `minInterval`.
>
> **Teppo**: I  think that we should create a Signal K JavaScript client library that would accept the subscription
> commands and the connection would emit events such as
>
> * connection
> * disconnnection
> * reconnection
> * change (tree)
> * change:delta (delta) ** Side note: I think these should be changed in Multiplexer and js client to something like
>   data:tree and data:delta
> * diagnostic (for example the server could echo back a subscription message with status information? how do you
>   collate with sent messages? client.send(command) returns a sequence id?)
>
> **Rob**: see [Communication Protocols](./communication_protocols.html)

### Use Cases and Proposed Solutions

#### Local boat individual instruments

A gauge-type display for just one or a few data items for the 'self' vessel should be able to specify that it only wants
those items for the self vessel.

This can be achieved by a default WebSockets connection `/signalk/stream`, then sending a JSON message:

```json
{
  "context": "vessels.self",
  "subscribe": [
    {
      "path": "environment.depth.belowTransducer",
    },
    {
      "path": "navigation.speedThroughWater",
    }
  ]
}
```

The JSON format is also viable over a simple TCP or serial transport, and is therefore supported as the primary
subscription method.

#### Map display with all known vessel positions & directions, served over 3G cellular connection

```javascript
{
  "context": "vessels.*",
  "subscribe": [
    {
      "path": "navigation.position",
      "period": 120000,
      "format": "full",
      "policy": "fixed"
    },
    {
      "path": "navigation.courseOverGround",
      "period": 120000,
      "format": "full",
      "policy": "fixed"
    }
  ]
}
````

The result is a complete Signal K data tree with just position and courseOverGround branches for all known vessels, sent
every 2 minutes (120 seconds) even if no data has been updated.

#### Position of a certain vessel, once per minute at most

```javascript
{
  "context": "vessels.230029970",
  "subscribe": [
    {
      "path": "navigation.position",
      "minPeriod": 60000,
      "format": "delta",
      "policy": "instant"
    }
  ]
}
```

The result will be delta position messages for vessel 230029970, broadcast whenever it changes, but with minumum
interval of 60 seconds. Messages are delayed to meet the minimum interval with newer messages overriding the previous
message in the buffer.

#### Optional extension to WebSockets (/signalk/stream)

For convienience the WebSockets URL may support the following parameters:

* the parameter `context=vessels.self` becomes the context. By default it is `vessels.self`, e.g. own vessel
* the parameter `path=[path.to.key]`. It can be added many times.
* the parameter `period=[millisecs]` 
* the parameter `format=[delta|full]` 
* the parameter `policy=[instant|ideal|fixed]`
* the parameter `minPeriod=[millisecs]`
