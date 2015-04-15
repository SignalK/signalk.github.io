---
title: Communication Protocols
layout: developers
id: cp
---

## {{page.title}}

This page outlines basic mapping from Signal K json formats to common messaging protocols, and a describes a provisional
implementation of Signal K over STOMP and MQTT. This is a pretty rough mapping to explore the similarities. Feel free to
edit

 Signal K | STOMP | MQTT | Notes | Notes
----------|-------|------|-------| ------
 | CONNECT or STOMP | CONNECT | username, password |
 | CONNECTED | CONNACK? | |
get, list, put, updates | SEND | PUBLISH | PUBACK,PUBREC, PUBREL, PUBCOMP | *client sends*
subscribe | SUBSCRIBE | SUBSCRIBE | |
unsubscribe | UNSUBSCRIBE | UNSUBSCRIBE | |
 | ACK or NACK | | SUBACK, UNSUBACK, CONNACK |
 | BEGIN or COMMIT or ABORT | |  |
 | DISCONNECT | DISCONNECT | |
updates, pathlist | MESSAGE | PUBLISH | | *Server sends*
 | RECEIPT | | |
 | ERROR | |  |
heartbeat? | heartbeat? | PINGREQ | |
heartbeat? | heartbeat? | PINGRESP | |

Based on the above it is quite simple to transport a Signal K message on these protocols by simply putting it in the
payload. In  terms of the delta format messages there is a high level of correspondence between the Signal K `context`,
and the message queue. Hence it is practical to subscribe to a temporary message queue based on an implicit context. The
full Signal K message can be sent as payload, as this makes further protocol swapping or processing simpler.

MQTT and STOMP differ in their wider capabilities. If we take the MQTT QOS concept, there is no equivalent in STOMP or
Signal K. But if we limit these additional capabilities to the relevant protocol only, then they provide no real issues.

For instance if we have a sensor on MQTT QOS2 (guaranteed once only) the MQTT layer should honor that. But once beyond
that layer the next protocol may or may not provide the same. Hence its guaranteed for MQTT, but not for the next jump
over UDP. If a reply never arrives via UDP, then MQTT will never know and not care. If QOS is important, then
appropriate end-to-end protocols should be used.

One improvement that should be made is for each Signal K message to have a unique ID. This would then map to the STOMP
and MQTT IDs, making better end-to-end co-ordination. These IDs are sometimes used in replies, so they should be
consistent across protocols.

Overlapping paths are considered in MQTT, so its reasonable to assume each broker will be smart enough to handle
overlapping paths (queues).

Both STOMP and MQTT use the SUBSCRIBE header to initiate a queue subscription. Since the Signal K server will be a
client of the broker, and responsible for sending to the broker's clients, a method of propagating the subscription to
the Signal K server is required.

In the current implementation this is achieved by having a common queue `queue://signalk.put`. This is a receive-only
queue for the Signal K server, and all conversations between client and Signal K server start here.

After connecting and authenticating to the STOMP/MQTT server, the client posts a normal Signal K message into
`queue://signalk.put` Lets assume the case of a subscribe message:

* The client generates a unique ID and sends a STOMP/MQTT SUBSCRIBE request for a suitable temporary queue name, using
  the unique ID `signalk.3202a939-1681-4a74-ad4b-3a90212e4f33.vessels.motu.navigation`.
* The client then sends a Signal K subscribe message to `signalk.put` with the `reply-to` header set to the temporary
  queue name eg `reply-to=signalk.3202a939-1681-4a74-ad4b-3a90212e4f33.vessels.motu.navigation`.
* The client then listens on `signalk.3202a939-1681-4a74-ad4b-3a90212e4f33.vessels.motu.navigation` for the subscribed
  Signal K messages.
* The client sends a Signal K unsubscribe message to `signalk.put` to stop the process.

Hence a client can subscribe to a queue (path) in the broker, and the subscription will be notified to the signak
server, so that the appropriate Signal K updates can be sent to the appropriate queue periodically.

In Signal K we have proposed a series of 'verbs' (`SUBSCRIBE`, `UNSUBSCRIBE`, `LIST`, `GET`, `PUT`) which can also be
sent to the `signalk.put` queue. Sending a Signal K `GET` message to this queue could cause the Signal K server to
respond, probably in a synchronous reply (or on a temporary queue). This allows for similar symantics to the current
messaging.

Support for this exists in the  Signal K Java server using STOMP and an embedded ActiveMQ instance. It all seems to work
quite well, the result of a subscribe in STOMP format is regular messages:

```
MESSAGE
signalk_format:delta
message-id:ID:rth-40439-1423720220574-2:1:-1:1:468
ttl:3000
websocket.connectionkey:d2f691ac-a5ed-4cb7-b361-9072a24ce6bc
destination:/queue/signalk.d2f691ac-a5ed-4cb7-b361-9072a24ce6bc.vessels
timestamp:1423720711416
breadcrumbid:ID-rth-35890-1423720222312-0-151746
expires:0
subscription:5564
content-length:244
priority:4

{
  "context": "vessels",
  "updates": [
    {
      "values": [
        {
          "path": "366982320.navigation.position.longitude",
          "value": -122.41818333333335
        }
      ],
      "source": "AIS"
    },
    {
      "values": [
        {
          "path": "366982320.navigation.position.latitude",
          "value": 37.87668333333333
        }
      ],
      "source": "AIS"
    }
  ]
}
```
