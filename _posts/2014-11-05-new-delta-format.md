---
title: New Delta Format
layout: post
author: Tim
gravatar: https://avatars2.githubusercontent.com/u/1078998
---

Signal K has a new format for specifying model changes. Now, instead of sending
the entire model whenver a value changes, we can send just the changes using
the format below. An example of a delta message is presented below.

{% highlight json linenos %}
{
  "context": "vessels.230099999",
  "updates": [
    {
      "source": {
        "pgn": "128275",
        "device" : "/dev/actisense",
        "timestamp": "2014-08-15T16:00:05.538Z",
        "src": "115"
      },
      "values": [
        {
          "path": "navigation.logTrip",
          "value": 43374
        },
        {
          "path": "navigation.log",
          "value": 17404540
        }
      ]
    },
    {
      "source": {
        "device" : "/dev/actisense",
        "timestamp":"2014-08-15T16:00:00.081Z",
        "src":"115",
        "pgn":"128267"
      },
      "values": [
        {
          "path": "navigation.courseOverGroundTrue",
          "value": 172.9
        },
        {
          "path": "navigation.speedOverGround",
          "value": 3.85
        }
      ]
    }
  ]
}
{% endhighlight %}

The first attribute of the delta object is `context`. The `context` attribute
identifies the specific source system which the delta update applies to. In the
example above, the context is a vessel with an MMSI of 230099999. If this
context doesn't exist (i.e. this is a new source system), a new context will be
created in the model at the specified path.

Next, there is an array called `updates` which contains 1 or more update
objects. The update object consists of `source` and `values` where the source
describes the device which generated the update (this could be a sensor, chart
plotter, computer or whatever) and the values array is an array of update
objects which consists of a path and a value.

Paths are dot delimited and it is expected that the consumer propagates the
source timestamp down all of these paths.

This update is available on GitHub in the master branch of
[SignalK/n2k-signalk](https://github.com/SignalK/n2k-signalk).

