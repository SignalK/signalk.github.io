---
title: Proposed Top Level Model Change
layout: post
author: Tim
gravatar: https://avatars2.githubusercontent.com/u/1078998
publishDate: 2014-04-06
---

Currently the SignalK model looks, at a high level, like this.

```json
{
  "vessels": [
    { "localBoat": { ... } },
    { "anotherBoat": { ... } },
    { "someOtherBoat": { ... } },
    { "bigBoat": { ... } }
  ]
}
```

This isn't terribly efficient for updating your boat's information. Essentially, you have to loop
through the array of objects until you find your boat as there is no guarantee that your boat will
be the first in the array. A better way as proposed by @rob42 and ammended by @fabdrol is outlined
below.

```json
{
  "localBoat": { },
  "otherBoats": [
    { "id": "anotherBoat", ... },
    { "id": "someOtherBoat", ... },
    { "id": "bigBoat", ... }
  ]
}
```

Essentially, what this does is move your boat out of the array to a top level position which makes
accessing it a constant time operation. All the other boats remain in an array for easy access using
a map function.

```js
// Assume this is a large SignalK object
var signalk;

// Return an array of anonymous objects containing True Wind vector information
// for every boat we know about
var windMap = Array.prototype.slice.call(signal.otherBoats).map(function (node) {
  return node.environmental.windTrue;
});

// windMap looks like this:
winMap = [
  { speed: 3.14, angle: 130.5 },
  { speed: 5.24, angle: 141.2 },
  { speed: 4.18, angle: 127.9 },
  { speed: 2.99, angle: 151.4 },
  { speed: 3.91, angle: 133.7 },
];
```

Obviously, in a real application you would want additional information like vessel name,
coordinates, and a timestamp for those values, but this should serve for an illustration.

This model assumes that all data is delivered to the client on a single WebSocket channel. An
alternative approach, proposed by @tkurki, would work very well if there was one WebSocket
channel per tracked vessel and would look like this.

```js
// localBoatData and someBoatData each receive updates from separate WebSocket
// streams
var localBoatData = { speed: 5.5 };
var someBoatData = { speed: 22.1 };
var vessels = [localBoatData, someBoatData];
```

In this model, the same slice and map function from earlier works just as well across the whole
array of boats and yet we can still easily access the local boat information without iterating
through the array to find it. This would also work well if we added some sort of PubSub protocol on
top of WebSockets. Then there would still be a single open WebSocket channel, but client
applications could subscribe to different topics, with one topic per boat. There might also be an
additional topic or WebSocket channel which would keep the client informed of new boats in range or
when old ones went out of range so that it could automatically (un)subscribe to the topics for these
boats.
