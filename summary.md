---
title: Summary
layout: page
---

### The Problem
The common communication formats in the marine industry are the ubiquitous NMEA0183, and the later NMEA2000. All are
tightly controlled and access is controlled at significant cost by the NMEA. While both have been reverse engineered
over the years, they remain out of reach for many small organizations.

NMEA protocols also don't suit a modern world - they were published, and therefore 'locked' at a time when the Internet
was in its infancy, and mobile data, WiFi, smart phones, and tablets were unheard of.

But your boat is not the only one out there! There are lots of other boats out there, and lots of other sources of
information. In a connected world information can be accessed, and shared. So if you travel with a friend, or intend to
meet-up, it would be handy to see their boat on your chartplotter. Put a race on the Internet in real-time, and see the
other boats' data, even view the wind they are getting. Or just drop in on your mate's boat from the office and dream...

To move forward we need to think in a connected way, a way fundamentally different from NMEA protocols. Sun Microsystems
famously coined the phrase _The network is the computer_, and Signal K reflects that global peer-to-peer concept.

### The Signal K Model
Signal K defines a universal marine data model, a structure where every piece of information on a boat has a defined
place, and is stored in a consistent defined way. The model holds multiple boats: your own, and others acquired from
AIS, local WiFi, or the Internet. It also holds other data such as cruising notes, charts, weather, notices, port data,
etc.

```json
{
 "vessels": [
  {
   "localBoat": {
    "name": "motu",
    "mmsi": "2345678", 
    "source": "self", 
    "timezone": "NZDT",
    "navigation": {
     "state": {
      "value": "sailing",
      "source": "self",
      "timestamp": "2014-03-24T00:15:41Z"
     },
     "headingTrue": {
      "value": 23,
      "source": "self",
      "timestamp": "2014-03-24T00:15:41Z"
     },
     "headingMagnetic": {
      "value": 43,
      "source": "self",
      "timestamp": "2014-03-24T00:15:41Z"
     },
     "cogTrue": {
      "value": 23,
      "source": "self",
      "timestamp": "2014-03-24T00:15:41Z"
     },
     "declination": {
      "value": 20,
      "source": "self",
      "timestamp": "2014-03-24T00:15:41Z"
     },
     "speedOverGround": {
      "value": 4.5,
      "source": "self",
      "timestamp": "2014-03-24T00:15:41Z"
     },
     "speedThroughWater": {
      "value": 4.4,
      "source": "self",
      "timestamp": "2014-03-24T00:15:41Z"
     },
     "location": {
      "lat": {
       "value": -41.6789,
       "source": "self",
       "timestamp": "2014-03-24T00:15:41Z"
      },
      "lon": {
       "value": 173.12345,
       "source": "self",
       "timestamp": "2014-03-24T00:15:41Z"
      }
     },
     "altitude": {
      "value": 0,
      "source": "self",
      "timestamp": "2014-03-24T00:15:41Z"
     },
     "pitch": {
      "value": 0.1,
      "source": "self",
      "timestamp": "2014-03-24T00:15:41Z"
     },
     "roll": {
      "value": 0,
      "source": "self",
      "timestamp": "2014-03-24T00:15:41Z"
     },
     "rateOfTurn": {
      "value": 0,
      "source": "self",
      "timestamp": "2014-03-24T00:15:41Z"
     },
...and so on...
```

Since the data model is consistent, your instruments can show your data, or others data, and vice-versa. Each instrument
and sensor holds a partial copy of the model, with just the parts it's interested in. Since instruments supporting
Signal K can always read the data, they are compatible between all boats. Since all sensors store their data in the same
model, all sensors are compatible with all instruments.

For existing instruments and sensors, Signal K supports converters for legacy protocols (NMEA0183, NMEA2000, SeaTalk)
and others as they are required. And it's extensible for future needs, just submit a change on
[GitHub](https://github.com/signalk).

### Signal K Data Sharing
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

### Signal K Physical Transmission
Signal K data is transmitted as a JSON string. JSON is native to the Internet, and to browsers, so transmission is
supported on any medium that can access the Internet. That includes mobile data, WiFi, Ethernet, USB, Bluetooth, and
pretty much anything coming. But importantly we are just sending a string of characters - so we can send over serial
cables (RS232/442/etc.), Onewire, CAN, in fact almost anything.

Over the years the speed of data transmissions has increased enormously. 'FastMode' NMEA2000 is only 1 Mbit/s,
constraining their bandwidth severely. Most WiFi is now over 54Mbits/s, as are cellphones, and Ethernet is over
1000Mbits/sec. By utilizing these commodity media Signal K avoids bandwidth traps, and allows you to use a transmission
medium that suits the immediate need.

As a bonus it's a string format, with full meaningful names, so it's also easy to read with human eyes. This helps
enormously when developing or debugging.

