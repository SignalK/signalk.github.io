---
title: APIs and Conventions
layout: developers
developers: active
id: ap
---

## {{page.title}}

This page outlines the APIs and the conventions we use for ports, URLs, and miscellaneous details.

### Short Names

- `self` refers to the current vessel. Normally used in `vessels.self...`.

### Ports

The Signal K HTTP and WebSocket services SHOULD be found on the usual HTTP/S ports (80 or 443). The services SHOULD be
found on the same port, but may be configured for independent ports and MAY be configured for ports other than HTTP/S.

A Signal K server MAY offer Signal K over TCP or UDP, these services SHOULD be on port 55555[[1]](#fn_1).

If an alternate port is needed it SHOULD be an arbitrary high port in the range 49152&ndash;65535[[2]](#fn_2).

### URL Prefix

The Signal K applications start from the `/signalk` root. This provides some protection against name collisions with
other applications on the same server. Therefore the Signal K entry point will always be found by loading
`http(s)://«host»:«port»/signalk`.

### Versioning

The version(s) of the Signal K API that a server supports SHALL be available as a JSON object available at `/signalk`:

```json
{
    "endpoints": {
        "v1": {
            "version": "1.1.2",
            "signalk-http": "http://192.168.1.2/signalk/v1",
            "signalk-ws": "ws://192.168.1.2:34567/signalk/v1"
        },
        "v3": {
            "version": "3.0",
            "signalk-http": "http://192.168.1.2/signalk/v1",
            "signalk-ws": "ws://192.168.1.2/signalk/v1"
        }

    }
}
```

In this example the server provides two versions of Signal K, 1.1.1 and 3.0. The WebSocket endpoint for version 1.1.1 is
available on an alternate port.

Signal K clients specify which version of the API they wish to use by placing the version in the URL after the
prefix as `/signalk/vX` where `vX` is the major version of the Signal K specification of the endpoint matching an option
available from the `endpoints` object above.

#### REST/HTTP API: /signalk/v1/api

The base URL MUST provide a Signal K document that is valid according to the full Signal K [schema
specification]({{site.baseurl}}specification.html). The contents SHOULD be all the current values of the data items the
server knows.

If the path following the base is a valid Signal K path `GET` MUST retrieve the Signal K branch named by the path; e.g.
`/signalk/v1/api/vessels/123456789/navigation/speedThroughWater` returns

```json
{
    "value": 2.55,
    "source": {
        "type": "NMEA0183",
        "src": "VHW",
        "label": "signalk-parser-nmea0183"
    },
    "timestamp": "2015-08-31T05:45:36.000Z"
}
```

#### Streaming WebSocket API: /signalk/v1/stream

Initiates a WebSocket connection that will start streaming the server's updates as Signal K delta messages. You can
further specify the contents of the stream by using a more specific url: `/signalk/v1/stream/vessels/self` will stream
just the `self` vessel's data.

To initiate the subscription protocol use url parameter `/signalk/v1/stream?requireSubscriptions=true`. In subscription
mode the server will start with no subscriptions, hence no data will be streamed. The client should send subscription
messages upstream to the server to start receiving the corresponding data items. See [Subscription
Protocol](subscription_protocol.html) for more details.

##### Connection Hello

Upon connection a 'hello' message is sent as follows:

```json
{
  "version": "1.1.2",
  "timestamp": "2015-04-13T01:13:50.524Z",
  "self": "123456789"
}
```

* * *

<a id="fn_1"></a>[1] Signal K has not registered a service port with IANA, for now we use an ephemeral port.
<a id="fn_2"></a>[2] See [RFC 6335 § 6](http://tools.ietf.org/html/rfc6335#section-6).
