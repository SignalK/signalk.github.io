---
title: Specification
layout: rsidebar
specification: active
sidebar: specification-sb.html
description: Technical Overview of the Signal K Specification and Schema
---

## [Organization](#) <a class="anchor" id="organization"></a>

Signal K has three key components:

1. **The Data Model** - This describes how to access information.
2. **The Security Model** - This describes how to make sure only the right people can carry out certain activities.
3. **The Protocol** - How the various components within the system interact with each other.

Signal K is hardware agnostic, and is intended to be used with commodity computer networks, using standards available
at the time. See Transport Mechanisms below.

To jump straight to the online Signal K specification and schema [click here](http://signalk.org/specification/latest/)

## [The Data Model](#) <a class="anchor" id="model"></a>
The Signal K data model (or schema) describes a large hierarchy of data points organized into topics and subtopics. It
can contain data from your boat, other boats in the vicinity, aids to navigation (AToNs), marinas, local points of
interest, online cruising guides, in fact any manner of data sources.

It has one important overarching rule and that is every piece of data has a defined location—a path in Signal K
terminology—which is immutable. These paths can be thought of as a form of [Uniform Resource
Identifier](http://en.wikipedia.org/wiki/Uniform_resource_identifier) (URI). We specifically do not call them
[Uniform Resource Locators](http://en.wikipedia.org/wiki/Uniform_resource_locator) (URLs) because, well, they’re not.

Your boat is usually identified to others by your MMSI. If you don’t have one, a random UUID (Universally Unique
Identifier) is used. There is a special case, 'self' which can be used when referring to your own boat.

In addition to dynamic data such as wind speed or GPS coordinates, the Signal K data model is capable of storing static
data such as cruising notes, charts, weather, notices, port data, etc.

Signal K Messages are transmitted in JSON (Javascript Object Notation) format. An example of a Signal K message is
given below.

```json
{
  "self": "123456789",
  "vessels": {
    "123456789": {
      "name": "motu",
      "mmsi": 123456789,
      "navigation": {
        "headingTrue": {
          "value": 23,
          "source": "self",
          "timestamp": "2014-03-24T00:15:41Z"
        },
        "headingMagnetic": {
          "value": 43,
          "source": "self",
          "timestamp": "2014-03-24T00:15:41Z"
        }
      }
    }
  }
}
```

Since the data model is consistent, your instruments can show your data, or others’ data, and vice-versa. Each
instrument and sensor holds a partial copy of the model, containing just the data it is interested in. Since
instruments supporting Signal K can always read the data, they are compatible between all boats. Since all sensors
store their data in the same model, all sensors are compatible with all instruments.

Users can query the Signal K Server to determine what services it supports.

More information on the Signal K Data Model including a complete list of the Schema Keys [can be found
here](http://signalk.org/specification/latest/).

## [The Security Model](#) <a class="anchor" id="secure"></a>

The second component of Signal K is the security model. The Signal K security model should be familiar to anyone who
has spent some amount of time using a Unix or Unix derivative (such as Linux or OS X). For those less familiar, the
Unix file system security system specifies three permissions (read, write, execute) for three security principals
(user, group, other). In Signal K, things are somewhat simplified by the fact that execute (as in cause an application
to run) doesn’t really apply.

Therefore, we only have read and write permissions. The classifications of user, group, or other still apply.

## [The Protocol](#) <a class="anchor" id="protocol"></a>
The third component is the Signal K protocol. This specifies how interactions between various devices which speak
Signal K should be carried out.

API Developers are free to implement the Data Model in their own way, however the most common way to interact with
Signal K is via a RESTful HTTP(s) API. This supports the normal GET, PUT, SUBSCRIBE and UNSUBSCRIBE commands using the
Signal K paths.

### Subscribing to Data Streams
A Signal K Server can make some information available as a data stream, and users can 'subscribe' to individual streams
or to all of them. This is useful where continuous streams of updates are expected, such as navigational information.

### Full and Delta Messages
An advantage of the Signal K protocol is that it is largely self-describing, with sufficient information to be able to
decode the message contained within it. For some purposes however, particularly for streaming sources, this may
represent an unnecessary overhead. The protocol includes the ability to receive messages only containing 'updates' from
selected sources. Signal K describes these as 'Delta' messages.

### Discovery
Signal K Servers can find each other using DNS Service Discovery (also known as Bounjour).

### Notifications
Signal K supports Alarms, Alerts and other forms of Notification.

More detail on the Signal K protocols [can be found here](http://signalk.org/specification/latest/).

## [Transport Layer](#) <a class="anchor" id="transport"></a>
Signal K data is transmitted as a JSON string. JSON is native to the Internet, and to browsers, so transmission is
supported on any medium that can access the Internet. That includes mobile data, WiFi, Ethernet, USB, Bluetooth, and
pretty much anything coming. But importantly we are just sending a string of characters – so we can send data over a
simple serial cable (RS232/442/etc.), Onewire, CAN, in fact almost anything.

Over the years the speed of data transmissions has increased enormously. NMEA 0183 is 4800 bits/s, the highspeed
version is 38.4 kbits/s and NMEA 2000 is 250 kbit/s. These are all fine for their respective uses, 38.4k is quite
enough for AIS messages for example. Most WiFi is now over 100Mbits/s, as are cellphones, and Ethernet is generally
1000Mbits/sec. By utilizing these commodity media Signal K avoids bandwidth traps and allows you to use a transmission
medium that suits the immediate need.

As a bonus it’s a string format, with full meaningful names, so it’s also easy to read with human eyes and can
generally be displayed in an ordinary Internet Browser. This helps enormously when developing or debugging.

## [NMEA Conversion](#) <a class="anchor" id="nmea"></a>
In the future we may well see Signal K sensors and transducers that will natively output Signal K data, but for now we
are reliant upon conversion of NMEA0183 and NMEA2000 data in to Signal K.

Conversion is possible in a number of ways, but the most common is for a Signal K server (running on Linux, Windows,
Android, etc.) to receive NMEA data via its serial connections or via a suitable 3rd party gateway.

One such gateway is the [iKommunicate](http://ikommunicate.com) from Digital Yacht, which is a dedicated, NMEA 2000
certified “black box” solution capable of converting both NMEA0183 and NMEA2000 data into Signal K in a simple “plug
and play” manner.

Alternatively, and for the more technical minded, you can use an Actisense [NGT-1-USB](http://actisense.com) to
connect a Signal K server to the NMEA2000 network. This has the benefit of providing the raw NMEA2000 PGN data directly
to the Signal K server where they are converted by the CanBoatJS library.
