---
title: DIY Sensors with Signal K Part 2: The Hardware
layout: post
author: Brian Smith
email: ba58smith at gmail dot com,
gravatar: https://avatars2.githubusercontent.com/u/15186790?s=400&v=4
status: published
---

In a [previous blog post](http://signalk.org/2019/08/04/sensesp-sensors.html), I wrote in general terms about using small, inexpensive microcontrollers to gather all kinds of data around your boat and make it available on your boat's network through Signal K. In this post, I'm going to describe, in detail, the device I built and deployed on my boat to gather and report four temperatures from my main engine. I hope it's detailed enough so that you could duplicate the project yourself. Don't be intimidated by the idea of doing this yourself - this was only my second ever real microcontroller project - it's not complicated.

In this post, I'll detail the hardware aspect of the device, and will address the software details in the next post.

### The Project
Build a device that monitors four temperatures on your boat and reports them to your Signal K server, so that you can see them on any device that can run a browser, and that has access to your boat's network (via Wi-Fi or Ethernet). It will consist of a microcontroller, four temperature sensors, a power supply for the microcontroller, and a resistor or two. You can build it on a breadboard, but if you want to deploy it on your boat, you'll have to do a little soldering. If you have a 3D printer, you could make a really cool enclosure for it, but I don't have one, so that's not part of my project.

### The Microcontroller
The Arduino (including all its variants - Uno, Due, Mega, etc.) is the most well-known hobbyist microcontroller, but we won't be using an Arduino. We will be using a microcontroller called the [Wemos D1 Mini](https://wiki.wemos.cc/products:d1:d1_mini), which is used like an Arduino, but which has 4 megabytes of RAM and built-in Wi-Fi capabilities. It's based on the ESP8266 processor. For simplicity, I will refer to the _"Wemos"_ in this post - when you read that, you can think "Arduino" if you like, or the more generic "microcontroller". Basically, a tiny computer that can read data from all kinds of sensors, process that data, and then send that to your boat's Signal K server. However, to complete this particular project, you should probably use the Wemos D1 Mini (NOT the D1 Mini LITE!), to make sure it's compatible with this software. Other ESP8266-based microcontrollers should work, but if you're going to buy one, be safe and buy the Wemos.

![Wemos D1 Mini](https://user-images.githubusercontent.com/15186790/62544760-68eed600-b82e-11e9-854c-df32a75e5b01.png)

### The Sensors
The [DS18B20](https://smile.amazon.com/gp/product/B07CPTCZ65/) is one of many temperature sensors that use the [1-Wire](https://en.wikipedia.org/wiki/1-Wire) method of communicating with the microcontroller. I chose them for my project because I found some that come with the sensor enclosed in a small, waterproof, stainless steel tube at the end of a long cable, allowing me to reach all parts of my main engine. But you can use any 1-Wire sensor you choose, based on what temperatures you want to monitor on your boat. 

![DS18B20](https://user-images.githubusercontent.com/15186790/62544895-9cc9fb80-b82e-11e9-968c-c814a519b380.png)

### The Power Supply
While there are a lot of ways to power a microcontroller project (battery, "wall wart", etc.), I decided I would tap into the 12V wiring running all over the boat. I have now done this (converted 12V boat power to a clean 5V or 3.3V for the microcontroller) in two different ways on two different projects. This time I just purchased a ["DC power shield"](https://wiki.wemos.cc/products:d1_mini_shields:dc_power_shield) for the Wemos that I think I'm going to use from this point forward. In the details, I'll show you all three. 

### The Prototyping Board
After only a few projects, I have settled on the prototyping board called "stripboard." (Also known as Veroboard.) I find it easy to design with, and easy to actually assemble projects on that will be able to be deployed permanently. But there's nothing magic about it - by all means, use whatever works for you. (If you want to buy stripboard, be sure that's what you're getting. It's NOT the same as other prototyping board that doesn't have all the holes in a single row connected to each other. See the video link at the end of this post.)

![Stripboard](https://user-images.githubusercontent.com/15186790/62544940-b703d980-b82e-11e9-89a4-b592ef8eda85.png)

### The Design Tool
I've scratched out plenty of project ideas with a pencil and paper, but when it comes to designing something that you're going to actually build, I suggest you use some software created for that purpose. The only one I have experience with is called [Fritzing](https://fritzing.org/home/). It's not perfect, and I'm not sure it's even being developed anymore, but it's free, and it's worked well for me to create schematics when necessary, and it works *really* well to design the physical layout of your project. I've included some screenshots from my Fritzing project to illustrate the project, and I think you'll see why I like it.

![Fritzing schematic example](https://user-images.githubusercontent.com/15186790/62544989-d1d64e00-b82e-11e9-89d5-d4eec90b926b.png)

### How Do You Learn This Stuff?
In a word, Google. In a few more words, forums and datasheets. I've spent countless hours searching for, and reading about, the projects of other people who have used the microcontrollers, and libraries, and sensors, and every other component I'm interested in. I typically start looking for a tutorial, and can usually find something, although some are much better than others. I've also joined at least five different forums so I can post questions there. At the end of this post, I'll list some of them. But if you're going to sign up for only one thing, make it the [Signal K Development workspace on Slack.com!](https://signalk-dev.slack.com)

### The Details
Let's start with the Fritzing view of the whole project, in the image below. 

![Fritzing view of project](https://user-images.githubusercontent.com/15186790/62545038-e9153b80-b82e-11e9-8a4a-12a67b11b1ae.png)

At the top, you see a voltage regulator with a couple of capacitors, providing 5V to the Wemos. On the bottom (see the close-up image), you see the four temperature sensors, with all of their like wires (3.3v power, ground, and data - red, black, and yellow wires) on the same strip of the stripboard, so that they all go to the same pin on the Wemos. 

![Fritzing close up](https://user-images.githubusercontent.com/15186790/62545075-fb8f7500-b82e-11e9-8921-da4ca7dc4c91.png)

The 1-Wire specification calls for a 4.7K ohm resistor between the data line and 3.3V, which you can see. The wires from the sensors attach to the project with screw termininals that are soldered to the stripboard. The Wemos attaches to the stripboard by plugging into two headers, which you can't see in this 2-D view of the project. You could solder it directly to the stripboard, but I much prefer to solder headers to the stripboard, solder pins to the Wemos, and plug the Wemos into the headers. (See the photo below.)

![Wemos inserted into header](https://user-images.githubusercontent.com/15186790/62545120-13ff8f80-b82f-11e9-8fd1-b84b60fd7236.png)

![Solder side of stripboard](https://user-images.githubusercontent.com/15186790/62545170-31ccf480-b82f-11e9-8e0f-2cd262f3c01a.png)

*The underside of the project, where all the soldering happens*

The voltage regulator in this image is a very basic [LM7805](https://smile.amazon.com/Voltage-Regulator-Linear-L7805CV-Positive/dp/B07H9M9SFM/) fixed voltage regulator. If you look at the datasheet (ALWAYS look at the datasheet!), you'll see that it can take up to 35VDC input, and output a constant 5VDC, which is perfect for the Wemos. I tapped into the wires providing 12V and GND to one of my bilge pumps to provide the input into the voltage regulator. Also in the datasheet, you'll see that it recommends a couple of capacitors, so I put them in. The Wemos's onboard voltage regulator probably makes the capacitors unnecessary, but I put them in anyway. (See image below, from datasheet.)

![LM7805 with caps](https://user-images.githubusercontent.com/15186790/62545227-51641d00-b82f-11e9-8aa2-75c1ed1fe27d.png)

I used the LM7805 in my very first boat project, and it's been working fine with an Arduino Nano for well over a year. But in my second project (the one I'm writing about here), I went with an adjustable "buck converter" type voltage regulator. They're a little more expensive than the LM7805 (still only about a dollar each), but they don't heat up like the LM7805. There are a lot of these on the market - search on Amazon or wherever you like to buy electronic parts. Even though the Wemos's power input pin is labeled "5V", everything in my project (including the Wemos) operates at 3.3V, so I dialed the voltage down to 3.3, and input that into the "5V" pin.

![Regulator](https://user-images.githubusercontent.com/15186790/62545273-6640b080-b82f-11e9-8151-94adad480976.png)

Like the Wemos, I used pins soldered to the regulator and a header soldered to the stripboard, rather than soldering the regulator to the stripboard.

![Voltage regulator side view](https://user-images.githubusercontent.com/15186790/62545308-79538080-b82f-11e9-9c0d-e8adb2b22480.png)

Since I built this project, someone in the Signal K workspace on Slack suggested an even nicer voltage regulator, and I've purchased some for my next project. I like them for two reasons: they're in the form of a "shield" designed for the Wemos, so they plug right into a header that you solder to the top of the Wemos.  Secondly, they have two different methods for connecting power right on the PCB - a barrel connector for a wall wart to plug into, and two screw terminals (which I will use), for a POS and GND wire to connect to. It takes 7 - 24VDC and passes a clean 5V right into the Wemos through the "5V" and "GND" pins. This saves me from having to solder screw terminals onto my project, but almost as important, it gives me a way to power the project while I'm still testing it (through the wall wart connector).

![Wemos DC power shield](https://user-images.githubusercontent.com/15186790/62545345-8e301400-b82f-11e9-9b58-f5d9644afd22.png)

The connection of the 1-Wire sensors' wires, and the 4.7K ohms resistor, is easier described with a picture than with words, so here you go. It looks a LOT like the Fritzing design, above, which is one of the things I really like about Fritzing.

![ME temp device installed](https://user-images.githubusercontent.com/15186790/62545429-aef86980-b82f-11e9-9849-688fb30b213a.png)

### The Installation
As described earlier, I'm using this to monitor four temperatures on the main engine in my boat: the case of the 12V alternator, the case of the 24V alternator, the coolant thermostat housing, and the elbow where the raw water is injected into the exhaust. In each case, I've used zip-ties or stainless safety wire to attach the sensor to the item being sensed (see images below), and I know that this doesn't give me exact temperatures. For example, if I wanted to get the exact temperature of the inside of the elbow where the raw water injects into the exhaust, I would have to drill a hole into the elbow and somehow insert the sensor into the coolant itself. For my puposes, zip-tying the sensor to the elbow provides me with readings that are CONSISTENT, and by using an infrared thermometer, I can easily determine the difference between the sensor's reading and the actual temperature. In my case, when the engine is fully warmed up, the temperature at the elbow is about 102 degrees Fahrenheit. The sensor outputs 96 degrees, because it's strapped to the outside of the elbow, and only a small part of it touches the elbow - the rest isn't touching anything other than the air. In the software, I simply add 6 degrees to the sensor output so that the displayed temperature is what I expect. Besides - as with so many things we monitor on engines, it's not the actual reading that we care about, it's knowing what's normal, and then monitoring to make sure the reading stays in the normal range. I also like having the displayed temperature of each thing be the same as the temperature I measure with my infrared thermometer, simply for consistency.

![12V alternator case sensor](https://user-images.githubusercontent.com/15186790/62545550-eb2bca00-b82f-11e9-882d-95b07b12e781.png)

*12V alternator case sensor*

![24V alternator case sensor](https://user-images.githubusercontent.com/15186790/62545637-19110e80-b830-11e9-8e09-ec678885e681.png)

*24V alternator case sensor*

![Thermostat housing sensor](https://user-images.githubusercontent.com/15186790/62548343-a0608100-b834-11e9-85fc-2daf83bc5cf1.png)

*Coolant thermostat housing sensor*

![Temp sensor on raw water elbow](https://user-images.githubusercontent.com/15186790/62545812-668d7b80-b830-11e9-8316-ec9701c7110d.png)

*Elbow where raw water is injected into engine exhaust*

I found a location for the device that all of the DS18B20 cables can reach, and that doesn't vibrate much while the engine is running, and that's not especially hot. (The ambient temperature in my engine room at cruise is about 110 F, which is well under the maximum environmental temperature for the Wemos.) It's on the mounting base of my generator, only a foot away from the main engine. Then I simply drilled a hole in the stripboard and screwed it to the mounting location. I added an on-off switch to the 12V line that provides power to the device so that I can turn it off when the boat isn't running. (See picture below.)

![Device installation](https://user-images.githubusercontent.com/15186790/62546759-11eb0000-b832-11e9-95aa-c1ef6e6e06c8.png)

That's about it for the hardware part of the project. In the next post, I'll describe the software that the Wemos runs to read the sensors and send their output to my Signal K server.

### Helpful Links
1. Link for each product mentioned.
* [Wemos D1 Mini product page](https://wiki.wemos.cc/products:d1:d1_mini)
* [DS18B20 sensors on Amazon](https://smile.amazon.com/gp/product/B07CPTCZ65/)
* [1-Wire wikipedia page](https://en.wikipedia.org/wiki/1-Wire)
* [Long, detailed video of using stripboard](https://www.youtube.com/watch?v=DSk5DQhi1r0)
* [Video of using Fritzing to design a stripboard circuit](https://www.youtube.com/watch?v=MoDhyi4eNYo)
* [7805 fixed 5V voltage regulator on Amazon](https://smile.amazon.com/Voltage-Regulator-Linear-L7805CV-Positive/dp/B07H9M9SFM/)
* [Adjustable buck converter I used, on Amazon](https://smile.amazon.com/gp/product/B0758ZTS61/)
* [Wemos DC power shield product page](https://wiki.wemos.cc/products:d1_mini_shields:dc_power_shield)
* [Fritzing home page](https://fritzing.org/home/)

2. Link for each forum I've joined and gotten good answers from. (You dont have to join most forums unless you want to post. Often, reading existing posts is all you need.)
* [Signal K Development on Slack - this is a must!](http://slack-invite.signalk.org/)
* [Arduino Forum](https://forum.arduino.cc/)
* [ESP8266 Forum](https://www.esp8266.com/viewforum.php?f=165)
* [All About Circuits - excellent for project design questions](https://forum.allaboutcircuits.com/)
