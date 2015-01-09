---
title: Message formats
layout: page
---

###Multiple devices providing duplicate data

It is quite possible for a key value to come from more than one device. eg position (lat/lon) could come from several gps enabled devices, and multiple depth sounders are not uncommon. We need a consistent way to handle this.

All the incoming values may well be valid in their own context, and it is feasible that all of them may be wanted, for instance, displaying depth under each hull on a catamaran.

Hence discarding or averaging is not a solution, and since signalk is unable to derive the best way to handle multiple values it must always fall to a default action, with human over-ride when needed. 

In signal K we simply store all the options in the tree, and have the main 'source' reference the options.

If its the first value for the key, it becomes the default value and looks like this:

```json
{"vessels":
    {"self":
        {"navigation":
            {"courseOverGroundTrue":
                {
		    "value": 102.29,
		    "source": "/dev/actisense",
		    "timestamp": "2014-08-15-16:00:00.081",
		    "src": "115",
		    "pgn": "128267"
		}
	    }
	}
    }
}
```

If another value with different source arrives, we add an option object and put both values in there - if its our preferred source (from persistent config) we auto-switch to it, otherwise we just record it. It look like this:

```
{"vessels":
    {"self":
        {"navigation":
            {"courseOverGroundTrue":
                {
                 "value": 102.29,
                 "source": "options.actisense-128267-115",
                 "options":
                    {
                    "ttyUSB1-imu":  **a unique name, see below
                        {  
                            "value": 99.2900009155,
                            "source": "/dev/ttyUSB1"
                            "timestamp": "2014-08-15-16:00:00.081",
                        },
                     "actisense-128267-115":
                        {
                            "value": 102.29,
                            "source": "/dev/actisense",
                            "timestamp": "2014-08-15-16:00:00.081",
                            "src": "115",
                            "pgn": "128267"
                        }
                    }
                }
            }
        }
    }
}
``` 

Now simple rules can apply to obtain the default, or any specific value:

* If there is no 'options' object, just return the value
* If an 'options' exists then the 'source' value is a key to the default entry in the options object.
* To see all the options, use the REST api or subscribe to the options object. A given device may choose to subscribe to a specific entry in 'options', allowing multiple displays or users of the various values.

###Unique names

The identifer is constructed as follows:

    n2k: producerid-pgn-sourceid (producer id from server configuration, others from n2k data)
    nmea0183: producerid-talkerid-sentence (like n2k)
    signalk: any valid string [a-zA-Z0-9]

(The nmea0183 talker id is not in the schema as I write this, it will be added shortly)