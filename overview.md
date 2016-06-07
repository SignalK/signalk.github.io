---
title: Overview
layout: rsidebar
overview: active
sidebar: overview-sb.html
description: "With the release of V1.0.0, Signal K is the next generation solution for marine data exchange. It not only allows for
communication between instruments and sensors on board a single vessel, but also to allow for sharing of data between
multiple boats, aids to navigation, bridges, and marinas."
---

## [Introduction](#) <a id="introduction"></a>
With the release of V1.0.0, Signal K is the next generation solution for marine data exchange. It not only allows for
communication between instruments and sensors on board a single vessel, but also to allow for sharing of data between
multiple boats, aids to navigation, bridges, and marinas. It is designed to be easily consumable by Web and Mobile
applications and to connect modern boats to the Internet of Things.

## [Rationale](#) <a id="rationale"></a>
In the last few years, it has become clear that there is a real need for a new communications protocol for the marine 
industry that will catch up and address the needs of a changing and ever more interconnected world. Nearly all marine 
electronic systems have interfaces that are over 30 years old. Unlike some other ubiquitous communication protocols of 
a similar age, NMEA 0183 has not aged so well. This was recognized as early as 1994 when development began on a 
replacement, the NMEA 2000 protocol. Unfortunately, by the time this replacement arrived on the market in early 2001, 
it was already showing its age. Fourteen years later, it is clear that a new forward-thinking approach is required.

There are two main problems with the existing standards:-

**Technical** - Both standards are fundamentally local area serial networks designed for limited deployments in simple 
environments.  NMEA0183 is normally limited to 4800 baud (or 34,800bps in high speed mode) and one transmitting device. 
NMEA 2000 works at a significantly higher bit-rate (250kbps) and allows multiple devices to transmit on one shared bus, 
but it is limited to 50 devices on a bus. These decisions may have been perfectly rational twenty or thirty years ago, 
but today we need something more capable and extensible.

**Legal** - Although all NMEA standards are published and available for use by any developer and therefore are 
technically "open standards", anyone wishing to use them must not only pay for the standards but also sign a license 
agreement which restricts how they can be used and in the case of NMEA 2000, a non-disclosure agreement. In essence, 
this prevents the release of an open source application developed using these standards.

Finally, and most importantly, both NMEA standards and the other proprietary protocols in the industry were developed
when the instruments on the average boat were much simpler and much less capable. In a world where your home thermostat
is connected to the Internet and the number of Internet connected devices in the United States alone is projected to
exceed a billion by 2016, it seems archaic that your boat is still an island to itself.

After all, there are lots of other boats out there, and lots of other sources of information, all of which could be of 
interest and benefit to you. In the modern connected world, shouldn't you be able to access that information from your 
boat where ever you are and on whatever device you want?

To move forward we need to think in a connected way, a way fundamentally different from NMEA protocols. Sun Microsystems
famously coined the phrase _The network is the computer_, and Signal K reflects that global peer-to-peer concept.

## [Organization](#) <a id="organization"></a>
Signal K is broken down into three components. The first is the data model. The Signal K data model describes a large
hierarchy of data points organized into topics and subtopics. It can contain data from your boat, other boats in the
vicinity, aids to navigation (AToNs), marinas, local points of interest, online cruising guides, in fact any manner of
data sources. It has one important overarching rule and that is every piece of data has a defined location &mdash; a
path in Signal K terminology &mdash; which is immutable. These paths can be thought of as a form of [Uniform Resource
Identifier](http://en.wikipedia.org/wiki/Uniform_resource_identifier) (URI). We specifically do not call them [Uniform
Resource Locators](http://en.wikipedia.org/wiki/Uniform_resource_locator) (URLs) because, well, they're not.

In addition to dynamic data such as wind speed or GPS coordinates, the Signal K data model is capable of storing static
data such as cruising notes, charts, weather, notices, port data, etc.

The second component of Signal K is the security model. The Signal K security model should be familiar to anyone who has
spent some amount of time using a Unix or Unix derivative (such as Linux or OS X). For those less familiar, the Unix
file system security system specifies three permissions (read, write, execute) for three security principals (user,
group, other). In Signal K, things are somewhat simplified by the fact that execute (as in cause an application to run)
doesn't really apply. Therefore, we only have read and write permissions. The classifications of user, group, or other
still apply.

The third component is the Signal K protocol. This specifies how interactions between various devices which speak Signal
K should be carried out. It consists of five basic commands: `list`, `get`, `put`, `subscribe`, and `unsubscribe`.

For the examples which follow, we will be using JSON to display the data model, security model, and sample exchanges of
commands between devices. This is not meant to be taken as a proscription that Signal K data must be transmitted using
JSON or that it somehow relies on JavaScript or JSON to operate. It is merely a convenient way to display the
information. However, one should note that Signal K is very much a work in progress and there has not yet been any
decision made on the format of the initial handshake exchange which would set up between two communicating devices the
data serialization format to use.  _Caveat implementor_.

## [The Data Model](#) <a id="model"></a>
Let us begin with a simplified example of the Signal K data model. The complete reference for the currently implemented
model is [here](/specification/#schemas/signalk.json).

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

Since the data model is consistent, your instruments can show your data, or others data, and vice-versa. Each instrument
and sensor holds a partial copy of the model, containing just the data it is interested in. Since instruments supporting
Signal K can always read the data, they are compatible between all boats. Since all sensors store their data in the same
model, all sensors are compatible with all instruments.

## [Security](#) <a id="security"></a>

## [The Protocol](#) <a id="protocol"></a>
So we have a clean extensible model of data, capable of holding information from many boats, many sources. Now we need
to transfer that data efficiently between interested devices. The model is a hierarchical tree, with meta-data on the
structure and definition. Its transferred as a JSON string, which is a filtered image of the full tree containing just
the information you want. So a device may just require a vessels speed

```javascript
vessels.localBoat.navigation.speedThroughWater
```

or maybe full navigation data

```javascript
vessels.localBoat.navigation
```

or your chartplotter might display wind information from every location that was offering it

```javascript
var windVectors = Array.prototype.slice(vessels)
 .map(function(node) {
  return node.environment.wind
 });
```

Signal K allows easy replication and merging of data between devices. It enables universal interoperability between
devices, and it provides a common base for existing and new marine applications.

## [Transport Mechanisms](#) <a id="transport"></a>
Signal K data is transmitted as a JSON string. JSON is native to the Internet, and to browsers, so transmission is
supported on any medium that can access the Internet. That includes mobile data, WiFi, Ethernet, USB, Bluetooth, and
pretty much anything coming. But importantly we are just sending a string of characters &endash; so we can send over
serial cables (RS232/442/etc.), Onewire, CAN, in fact almost anything.

Over the years the speed of data transmissions has increased enormously.  NMEA 0183 is 4800 bits/s, the highspeed
version is 38.4 kbits/s and NMEA 2000 is 250 kbit/s, these are all fine for their respective uses, 38.4k is quite enough
for AIS messages for example. Most WiFi is now over 54Mbits/s, as are cellphones, and Ethernet is over 1000Mbits/sec. By
utilizing these commodity media Signal K avoids bandwidth traps, and allows you to use a transmission medium that suits
the immediate need.

As a bonus it's a string format, with full meaningful names, so it's also easy to read with human eyes. This helps
enormously when developing or debugging.

## [NMEA Conversion](#) <a id="nmea"></a>
In the future, we may well see Signal K sensors and transducers that will natively output Signal K data, but for now we 
are reliant upon conversion of NMEA0183 and NMEA2000 data in to Signal K. This is possible in a number of ways, but the most
common is for a Signal K server (running on LINUX, Windows, Android, etc.) to receive NMEA via its serial connections or
via a suitable 3rd party gateway. One such gateway ["iKommunicate"](http://ikommunicate.com) from Digital Yacht
is a dedicated, black box solution that will convert both NMEA0183 and NMEA2000 in to Signal K in a simple "plug and play"
manner. Alternatively for the more technical minded, you can use an Actisense [NGT-1-USB](http://actisense.com) to connect a Signal K 
Server to the NMEA2000 network.
 
As more and more Signal K compatible hardware becomes available we will be listing it, along with apps and other Signal K
news on this site.

Signal K is going to grow and grow and with its extensible data format, modern design, HTML5 and JSON technology and active
development team, it will be able to meet all of your future needs. If there is something you want Signal K to do,just submit 
a change on [GitHub](https://github.com/signalk).


