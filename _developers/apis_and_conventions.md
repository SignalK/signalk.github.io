---
title: APIs and Conventions
layout: developers
developers: active
id: ap
---

## {{page.title}}

This page outlines the APIs and the conventions we use for ports, URLs, and miscellaneous details.

### Short Names

- `self` refers to the current vessel's unique name. Normally used in `vessels.self...`.

### URL and Ports

The Signal K server SHOULD be found on the usual HTTP/S ports (80 or 443) but MAY be found on the common alternate
HTTP/S ports (8080 or 8443). It MUST be found on one of these. Redirects from these ports to another port are allowed.

- MAY offer Signal K over TCP or UDP, SHOULD be on port 55555
- MAY offer NMEA 0183 over TCP or UDP, SHOULD be on port 10110
- MAY offer a STOMP broker, SHOULD be on port 61613
- MAY offer an MQTT broker, SHOULD be on port 1883

### Default URLs

The Signal K applications start from the `/signalk/` root. This provides some protection against name collisions with
other applications on the same server. Therefore the Signal K entry point will always be found by loading
`http(s)://«host»:«port»/signalk`

#### /signalk/auth/v1

Authorizes a session. Add `/user/password` to obtain a session cookie in the reply. SHOULD be done over HTTPS for
security.

#### /signalk/api/v1

If the path following the base is a valid Signal K path `GET` will retrieve the Signal K branch named by the path; e.g.
`/signalk/api/v1/vessels/123456789/navigation/position` returns

```json
{
  "vessels": {
    "123456789": {
      "navigation": {
        "position": {
          "latitude": 60.07979701,
          "longitude": 23.5330315,
          "source": "vessels.motu.sources.nmea.0183.GLL",
          "timestamp": "2015-04-13T01:13:50.524Z"
        }
      }
    }
  }
}
```

#### /signalk/api/v1/addresses

`GET` will retrieve the Signal K service address list as a JSON object. It SHOULD provides a full URL for the available
connections. This MAY be on a different host:port from the webserver.

The WebSocket entry MUST end in the stream URL, i.e. `/signalk/stream/v1`. It SHOULD be on the same port as the HTTP
API, but MAY be on a different port. No service port is registered for the WebSocket stream, so implementers SHOULD
choose an arbitrary high port in the range 49152&ndash;65535.

```json
{
  "mqttPort": "1883",
  "nmeaPort": "10110",
  "stompPort": "61613",
  "signalkPort": "55555",
  "websocketUrl": "ws://rth:3000/signalk/stream/v1"
}
```
> Note that if the Signal K service is using SSL, then the WebSocket URL should use `wss://`.

#### /signalk/stream/v1

Upgrade to a WebSocket connection. The `/signalk/api/v1/addresses` SHOULD be obtained first in case of host or port
redirections.

#### Connection Hello

Upon connection a 'hello' message is sent as follows:

```json
{
  "version": "0.1",
  "timestamp": "2015-04-13T01:13:50.524Z",
  "self": "123456789"
}
```
