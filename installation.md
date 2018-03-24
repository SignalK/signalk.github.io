---
title: Installation
layout: rsidebar
installation: active
sidebar: installation-sb.html
description: "Follow these instructions to get started with Signal K. Please don’t hesitate to ask the community for
  help if you run in to trouble."
---

## [Getting Started with Signal K](#) <a class="anchor" id="started"></a>
In this section we will look at different ways you can install and use Signal K on your boat. There are already a number of hardware platforms and devices being used, and more are bound to follow, but we will concentrate on three recommended starter packs that we will refer to as; Basic, Advanced and Expert.


## ["Basic" Starter Pack](#) <a class="anchor" id="basic"></a>
For boat owners that want to use Signal K with the minimum of effort, then the Basic Starter Pack gives you a simple way to install Signal K on your boat and start using the free apps and services that are available. The pack consists of a "Smart" Gateway that converts your existing NMEA data in to Signal K and installation just consists of wiring the gateway to your NMEA0183 and/or NMEA2000 networks and plugging the gateway in to a wireless router.

<figure>
<img src="/images/diagrams/SK_Smart_Gateway.png" width="400">
<figcaption>Basic Starter Pack</figcaption>
</figure>

The most popular "smart gateway" is Digital Yacht's [<a class="hyper">iKommunicate gateway</a>](http://ikommunicate.com)</a> which has three NMEA0183 and one NMEA2000 interfaces. It comes with some built-in Signal K web apps to get you started or you can copy other apps on to its 8GB SD card.

As your experience and confidence in Signal K grows, you can simply add a Signal K server to iKommunicate to make one of the advanced or expert packs (see below).


## ["Advanced" Starter Pack](#) <a class="anchor" id="advanced"></a>
For more technical minded boat owners that want to use the logging and cloud features of Signal K or who want to get involved in the "cutting edge" Signal K developments, then one of the two Advanced packs below would be the best starting point. For a larger, more powerful Signal K system, but where stability and reliability are key, then adding a Signal K server to an iKommunicate is the way to go.

<figure>
<img src="/images/diagrams/SK_Server+Gateway.png" width="400">
<figcaption>Advanced Starter Pack 1</figcaption>
</figure>

If you enjoy getting your hands dirty and want to experiment with the "cutting edge" features then a Signal K server with raw NMEA data coming from USB adaptors and gateways would be the best solution, as shown in the diagram below.

<figure>
<img src="/images/diagrams/Signal_K_Server_Diagram.png" width="400">
<figcaption>Advanced Starter Pack 2</figcaption>
</figure>

## ["Expert" Starter Pack](#) <a class="anchor" id="expert"></a>
For developers and seriously technical installations, then a larger network with multiple Signal K servers, Signal K sensors, etc. is possible and will become more common in the future as more people discover Signal K and the new functionality and benefits it can bring.

<figure>
<img src="/images/diagrams/SK_Multiple_Servers+Gateway.png" width="400">
<figcaption>Expert Starter Pack</figcaption>
</figure>

## [Installing your Signal K server](#) <a class="anchor" id="server"></a>
A Signal K server, is basically a webserver with the ability to read marine data and create web pages and web apps that uses this data. As a result, nearly any computer can be used as the hardware for a Signal K server, although a certain level of performance is required to avoid slow loading of web pages, etc. If you have an old laptop, then this would make a good initial test platform, although for permanent use on a yacht, a more power efficient hardware like a Raspberry Pi might be a better choice.

If you do decide to use a laptop (or desktop), then you should have no problem running all Signal K software on Windows, OS X or Linux, with Linux being the most tested and used operating system for Signal K.

Currently the most cost effective, powerful and best supported hardware platform for a Signal K server is the Raspberry Pi.

<figure>
<img src="/images/Raspberry_Pi3_clear.jpg" width="400">
<figcaption>Raspberry Pi 3</figcaption>
</figure>

With starter kits that include everything you need for around $50 USD, you can understand why they are so popular. There are a number of models, but the Raspberry Pi3 is probably the best model to go for and includes a Wi-Fi adaptor that can turn it in to a mini-wireless router, allowing you to serve up web pages to your mobile devices with no additional equipment. It runs from a 5v DC Micro USB plug (same as Android phones/tablets/Kindles), so you will need one of these USB cables plugged in to a 12v to USB type charging point on your boat to power it.

There are currently two "flavours" of Signal K server at the moment, one written for Node.js (JavaScript) and the other written in Java. Rather imaginatively they are referred to as the Node-Server and the Java-Server and both are open source and free to use. Unless you are a Java programmer and intend to do your development, the Node-Server is probably the more popular and up to date of the two server solutions (as of Feb 2018), but there is nothing to stop you installing both and seeing which you prefer.

Both the [*Node.js Server*](https://github.com/signalk/signalk-server-node) and the [*Java
Server*](https://github.com/signalk/signalk-server-java) have detailed Raspberry Pi “Getting Started” guides:

- [_*Signal K Node.js on Raspberry
  Pi*_](https://github.com/signalk/signalk-server-node/blob/master/raspberry_pi_installation.md)
- [_*Signal K Java on Raspberry Pi*_](https://github.com/signalk/specification/wiki/Raspberry-Pi-Installation-(Java-Server))

<!-- Commented Out until we have the NOOBs card and instructions done

## [New SD Card Image for NOOBS](#) <a class="anchor" id="noobs"></a>
To coincide with the release of Signal K Version 1.0.0 and to help people get up and running with Signal K in the quickest and easiest manner, the team have created a NOOBS SD Card Image. Simply download the image by clicking the "Download" button below, copy the image file on to a blank SD card (8GB recommended), plug the SD Card in to your RPi3, connect your RPi3 to a home/office network with internet, power up and wait for the magic to happen.

For a full step by step guide on creating and using the NOOBS SD Card, please click the "Instructions" button below.

<a href="/overview.html" class="button-big">Download</a>  <a href="/overview.html" class="button-big">Instructions</a>   

-->

## [Interfacing to Other Devices](#) <a class="anchor" id="interface"></a>
Most equipment on boats use NMEA0183, NMEA2000 or proprietary interfaces to communicate with each other. A lot of work has been done within the Signal K community to convert these different data formats in to Signal K. One option is to use an [*iKommunicate*](http://ikommunicate.com) to convert NMEA to Signal K, but if you want to use the raw data to access proprietary sentences, PGNs, etc. then the following are recommended;

**NMEA0183**  - There are a number of NMEA to USB adaptors around from [*Actisense*](http://www.actisense.com/product/usg-2/), [*Digital Yacht*](http://digitalyacht.co.uk/product/usb-nmea-adaptor/), [*Shipmodule*](http://www.shipmodul.com/en/miniplex-lite.html) which allow bi-directional transfer of the NMEA0183 Serial data (electrically similar to RS422) and convert it in to a USB virtual COM Port when plugged in to the Signal K server.

In LINUX the virtual COM Port will be seen as a device called `/dev/ttyUSB0` (the number could be different if there are multiple USB-to-serial adapters connected). Linux assigns these device names automatically when the device is connected, so it could change. If you want to ensure that the device always has the same name, you will need to write a UDEV rule to specify an alias. See [*creating UDEV rules*](udev.html) for details.

To verify that you have a working connection, you can use picocom or another terminal emulator to see if you are
receiving data. The default baud rate for NMEA 0183 is 4800.

```
$ picocom -b 4800 /dev/ttyUSB0
```

You should see NMEA 0183 sentences scrolling off the screen. To exit picocom press `Ctrl-a` followed by `Ctrl-x`.

**NMEA 2000 Instruments** - For NMEA 2000, there are less options. A quick search on Google will return a number of NMEA2000 to USB gateways, but the interface device is just one half of the solution. The other equally important part is the software that can read the data from the gateway and then convert it in to a format that the Signal K server understands. This software called [*CANboat*](https://github.com/canboat/canboat) is a suite of tools that can read and write NMEA2000 data and convert it in to Signal K.

Currently, CANboat only supports the [*NGT-1-USB from Actisense*](http://www.actisense.com/product/nmea-2000-to-pc-interface-ngt-1/) and any CAN Interface that supports "SocketCAN" such as the [CANable board](http://canable.io/).

CANBoat has recently been ported to JavaScript and is now part of the Signal K Node Server build, so no additional installation of CANBoat is required.    

**Proprietary Interfaces**  - There are a number of proprietary interfaces in the marine industry and by their nature, they tend to be pretty "closed" formats, that the manufacturers who create them, keep confidential. With Signal K being an open source data format, we are keen to support as many interface formats as possible and are working hard to encourage manufacturers to open up their proprietary formats.

The most common proprietary format in the marine industry is arguably SeaTalk™ which was developed by Autohelm in the 1990s and trade mark is now owned by Raymarine Limited. SeaTalk uses the same 4800 baud rate as NMEA0183 but allowed bi-directional serial data transfer across the network down one data wire.

Even though Raymarine no longer make a SeaTalk 1 interface, there are a number of 3rd party solutions that either convert to NMEA0183, which both of the Signal K servers can read, or convert to a raw $STALK format that allows more control and access to the SeaTalk data. One such interface that handles both types of SeaTalk conversions is the [*ST-NMEA interface*](http://digitalyacht.co.uk/product/st-nmea-usb/) from Digital Yacht.
