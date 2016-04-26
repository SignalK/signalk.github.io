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
            "signalk-http": "http://192.168.1.2/signalk/v1/api/",
            "signalk-ws": "ws://192.168.1.2:34567/signalk/v1/stream"
        },
        "v3": {
            "version": "3.0",
            "signalk-http": "signalk/v3/api/",
            "signalk-ws": "ws://192.168.1.2/signalk/v3/stream",
            "signalk-tcp": "tcp://192.168.1.2:34568"
        }

    }
}
```

This response is defined by the `discovery.json` schema. In this example, the server supports two versions of
the specification: `1.1.2` and `3.0`. For each version, the server indicates which transport protocols it
supports and the URL that can be used to access that protocol's endpoint; in the example, the `1.1.2`
REST endpoint is located at `http://192.168.1.2/signalk/v1/api/`. Clients should use one of these published
endpoints based on the protocol version they wish to use.

The server must only return valid URLs and should use IANA standard protocol names such as `http`.
However, a server may support unofficial protocols and may return additional protocol names; for example,
the response above indicates the server supports a `signalk-tcp` stream over TCP at on port `34568`.

A server may return relative URIs that the client must resolve against the base of the original request.

#### REST/HTTP API: /signalk/v1/api/

Note the trailing slash in the path.

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

Initiates a WebSocket connection that will start streaming the server's updates as Signal K delta messages. You can specify the contents of the stream by using a specific URL:

- ws://hostname/signalk/v1/stream?subscribe=self
- ws://hostname/signalk/v1/stream?subscribe=all
- ws://hostname/signalk/v1/stream?subscribe=none

With no query parameter the default is `self`, which will stream the data related to the `self` object. `all` will stream all the updates the server sees and `none` will stream only the heartbeat, until the client issues subscribe messages in the WebSocket stream.

If a server does not support some streaming options listed in here it must respond with http status code `501 Not Implemented`.

See [Subscription Protocol](subscription_protocol.html) for more details.

##### Connection Hello

Upon connection a 'hello' message is sent as follows:

```json
{
  "version": "1.1.2",
  "timestamp": "2015-04-13T01:13:50.524Z",
  "self": "123456789"
}
```

#### Service Discovery

A Signal K server should advertise its services over mDNS/Bonjour. The server must use the service types
- `_signalk-http._tcp` for http API
- `_signalk-ws._tcp` for WebSocket
- `_signalk-https._tcp` for HTTPS API
- `_signalk-wss._tcp` for secure WebSocket

Furthermore a server should advertise its web interface with normal Bonjour convention `_http._tcp` and `_https._tcp`.

* * *

<a id="fn_1"></a>[1] Signal K has not registered a service port with IANA, for now we use an ephemeral port.
<a id="fn_2"></a>[2] See [RFC 6335 § 6](http://tools.ietf.org/html/rfc6335#section-6).
