---
title: Data Model
layout: developers
developers: active
id: dm
---

## {{page.title}}

This page summarises the major technical aspects of the Signal K model for developers.

The architectural model for the Signal K model is based loosely on the UNIX model. In UNIX/Linux every resource is a
file, including IO, CPU, RAM, etc. In Signal K every datapoint or resource is an object in the Signal K tree. The tree
equates to a traditional hierarchical filesystem.

```json
{
  "vessels": {
    "self": {
      "version": "0.1",
      "name": "motu",
      "mmsi": "2345678",
      "source": "self",
      "timezone": "NZDT",
      "navigation": {
        "state": {},
        "courseOverGroundTrue": {},
        "roll": {},
        "rateOfTurn": {}
      }
    }
  }
}
```

The branches equate to folders, and the leaves equate to files. The structure is entirely _virtual_, you are free to
implement it however is best suited to your application. It is quite valid to implement it REST style, where a leaf
value like `roll` is derived by a function on the fly. But in terms of external representation, Signal K capable devices
will be assuming the _filesystem_ model, and the JSON representation will also reflect that. (The path representation is
generally dot-separated, but sometimes `/` separated in situations where dot is ambiguous, e.g. relative URIs are awful
in dot-syntax ` ...path.to.goal` vs `../path/to/goal`.)

Navigation of the tree is accomplished in a similar way to any filesystem. `*` and `?` wildcards can be used to define
paths which are used in data requests.

```
"vessels.366982320.navigation.position"
"vessels.*.navigation.position"
"vessels.*.navigation.position.l*"
```

Each node on the tree has several optional sub-nodes

```javascript
"courseOverGroundTrue": {
  "value": 102.7,           //obvious really...
  "source": "../n2k1-12-0", //a URI to the source of the data, possibly even http://..
  "meta": {}                //holds data to manage alarms, and auto-config of gui screens
  "_system":{}              //the _system object is a virtual filesystem which exposes the
                            //underlying device
  "_attr":{                 //filesystem specific data, eg secURIty, possibly more later
    "_mode": 644,           //UNIX style permissions, often written in `owner:group:other`
                            //form, `-rw-r--r--`
    "_owner" : "self",      //owner
    "_group": "self"        //group
  }
}
```

This introduces an important aspect. Any node name starting with `_` is normally stripped from output, especially
off-vessel. This is a useful way of 'hiding' custom nodes that only relate to the specific instance of Signal K.

The `source` node is very powerful. It has two forms, a JSON string, and a JSON object. The JSON string form above is a
simple redirect, and can be any valid URI. The same source may provide data for more than one signal K key (e.g.
NMEA0183 RMC from GPS) so we recommend the sources be held under a top-level (root) tree named `sources` to avoid
duplication.

The object form looks like this and holds meta-data on the source of the value

```javascript
"source": "sources.n2k1-12-0"               //relative or full URI to the source object
"n2k1-12-0": {                              //actual physical device that sends the readings
  "value": 102.29,
  "bus": "/dev/actisense",                  //the physical transport reference
  "timestamp": "2014-08-15-16: 00: 00.085", //time of reading
  "src": "201",                             //n2k src field (for an n2k reading)
  "pgn": "130577"                           //n2k pgn field
}
```

The `source` object will hold different data for different types of data. Obviously a weather forecast does not have a
`pgn`, but might have a `url`.

The `meta` node holds value specific settings that allow monitoring of alarm criteria, and auto-configuration of GUI
screens. See [Metadata-for-Data-Values](Metadata-for-Data-Values).

The `_system` allows access to the underlying device or server. In the same way as the `/proc` filesystem in Linux, this
can expose data such as current users, subscriptions, RAM or CPU usage, or be used to query an n2k node.

```javascript
{
  "context": "sources",
  "put": [
    {
      //request n2k 126996 message from device at n2k1-12-0
      "values": [
        {
          "path": "n2k1-12-0._system.pgn.request.126996",
          "value": ""
        }
      ]
    }
  ]
}
```

There are a selection of messages that provide IO operations to the Signal K tree. Each array has objects with the
`path` attribute in common. The basic verbs are

```javascript
{
  "context": "path.to.the.parent",
  "list": [],       //list the keys of context.path, recursively
  "get": [],        //get the object at context.path, recursively
  "put": [],        //put (set) the object at context.path
  "updates": [],    //result of a subscribe
  "subscribe": [],  //request regular updates of context.path
  "unsubscribe": [] //cancel subscription
}
```

These all take a similar set of options including wildcards.

And a typical request is

```javascript
{
  "context": "vessels.self", //set the common topmost node, eg same as 'cd' to the directory
  "subscribe": [             //the action verb, holds an array of objects 
     {
       "path": "navigation.courseOverGroundTrue", //target for the verb to act on, path is relative
                                                  //from context, eg context.path
     }
  ]
}
```

(Individual message formats are defined elsewhere) The above subscription results in a periodic message

```javascript
{
  "context": "vessels.self",
  "updates": [
    {
      "source": {
        "device": "/dev/actisense",
        "timestamp": "2014-08-15-16:00:00.081",
        "src": "115",
        "pgn": "128267"
      },
      "values": [
        {
          "path": "navigation.courseOverGroundTrue",
          "value": 172.9
        }
      ]
    }
  ]
}
```

Individual message formats are defined elsewhere, but all verbs have some common sub-nodes:

```javascript
"inclAttr": [true|false]    //default false, controls sending the _attr node
"inclSource": [true|false]  //default true, controls sending the source node
"followLinks": [true|false] //default true, controls resolution of relative source links.
```
