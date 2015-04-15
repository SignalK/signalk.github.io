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

The Signal K server SHOULD be found on the usual ports (http=80, https=443) but MAY be found on http=8080, and
https=8443. It MUST be found on one of these. Redirects from these ports to another port are allowed.

- MAY offer Signal K over TCP, SHOULD be on port=5555
- MAY offer Signal K over UDP, SHOULD be on port=5554
- MAY offer NMEA 0183 over TCP, SHOULD be on port=5557
- MAY offer NMEA 0183 over UDP, SHOULD be on port=5556
- MAY offer a STOMP broker, SHOULD be on port=61613
- MAY offer an MQTT broker, SHOULD be on port=1883

### Default URLs

The Signal K applications start from the `/signalk/` root. This provides some protection against name collisions with
other applications on the same server. Therefore the Signal K entry point will always be found by loading
http(s)://[server_name]:[port]/signalk

#### /signalk/auth/v1

Authorizes a session. Add /user/password to obtain a session cookie in the reply. SHOULD be done over HTTPS for security.

#### /signalk/api/v1

If the path following the base is a valid Signal K path GET will retrieve the Signal K branch named by the path; e.g.
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

GET will retrieve the Signal K service address list as a json object. It SHOULD provides a full URL for the available
connections. This may be on a different host:port from the webserver.

The websocket entry MUST end in the stream URL, i.e. `/signalk/stream/v1` SHOULD use the recommended port 3000.

```json
{
  "stompPort": "61613",
  "websocketUrl": "ws://rth:3000/signalk/stream/v1",
  "signalkTcpPort": "5555",
  "signalkUdpPort": "5554",
  "mqttPort": "1883",
  "nmeaUdpPort": "5556",
  "nmeaTcpPort": "5557"
}
```

#### /signalk/stream/v1

Upgrade to a websocket connection. The `/signalk/api/v1/addresses` should be obtained first in case of host or port
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
