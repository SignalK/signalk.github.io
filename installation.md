---
title: Installation
layout: rsidebar
installation: active
sidebar: installation-sb.html
description: "Follow these instructions to get started with Signal K. Please don’t hesitate to ask the community for
  help if you run in to trouble."
---

## [Getting Started with Signal K](#) <a id="started"></a>
In this section we will look at different ways you can install and use Signal K on your boat. There are already a number of hardware platforms and devices being used, and more are bound to follow, but we will concentrate on three recommended starter packs that we will refer to as; Basic, Advanced and Expert.


## ["Basic" Signal K Starter Pack](#) <a id="basic"></a>
For boat owners that want to use Signal K with the minimum of effort, then the Basic Starter Pack gives you a simple way to install Signal K on your boat and start using the free apps and services that are available. The pack consists of a "Smart" Gateway that converts your existing NMEA data in to Signal K and installation just consists of wiring the gateway to your NMEA0183 and/or NMEA2000 networks and plugging the gateway in to a wireless router.

<img src="/images/diagrams/SK_Smart_Gateway.png" width="400">

The most popular "smart gateway" is Digital Yacht's [iKommunicate gateway](http://ikommunicate.com) which has three NMEA0183 and one NMEA2000 interfaces. It comes with some built-in Signal K web apps to get you started or you can copy other apps on to its 8GB SD card.

As your experience and confidence in Signal K grows, you can simply add a Signal K server to iKommunicate to make one of the advanced or expert packs (see below).


## ["Advanced" Signal K Starter Pack](#) <a id="advanced"></a>
For more technical minded boat owners that want to use the logging and cloud features of Signal K or who want to get involved in the "cutting edge" Signal K developments, then one of the two Advanced packs below would be the best starting point. For a larger, more powerful Signal K system, but where stability and reliability are key, then adding a Signal K server to an iKommunicate is the way to go.

<img src="/images/diagrams/SK_Server+Gateway.png" width="400">

If you enjoy getting your hands dirty and want to experiment with the "cutting edge" features then a Signal K server with raw NMEA data coming from USB adaptors and gateways would be the best solution, as shown in the diagram below.

<img src="/images/diagrams/Signal_K_Server_Diagram.png" width="400">



## ["Expert" Signal K Starter Pack](#) <a id="expert"></a>
For developers and seriously technical installations, then a larger network with multiple Signal K servers, Signal K sensors, etc. is possible and will become more common in the future as more people discover Signal K and the new functionality and benefits it can bring.

<img src="/images/diagrams/SK_Multiple_Servers+Gateway.png" width="400">


and more technical minded boat owners that want to use the logging and cloud features of Signal K or who want to get involved in the "cutting edge" Signal K developments, then one of the two Advanced packs below would be the best starting point. For a larger, more powerful Signal K system, but where stability and reliability are key, then adding a Signal K server to an iKommunicate is the way to go.

<img src="/images/diagrams/SK_Server+Gateway.png" width="400">


## [Installing your Signal K server](#) <a id="server"></a>
 suggested Inter is the most popular "smart gateway" and but do not want to setup their own hardware, install tWhile it is pretty likely that all of the Signal K software will run on Windows and OS X just as well as Linux, we have
really only tested on Linux and the instructions below will assume that you are working on a Linux platform as well.

If you have a Raspberry Pi, both the [Node.js Server](https://github.com/signalk/signalk-server-node) and the [Java
Server](https://github.com/signalk/signalk-server-java) have detailed Raspberry Pi “Getting Started” guides:

- [Signal K Node.js on Raspberry
  Pi](https://github.com/signalk/signalk-server-node/blob/master/raspberry_pi_installation.md)
- [Signal K Java on Raspberry Pi](https://github.com/signalk/specification/wiki/Raspberry-Pi-Installation-(Java-Server))

If you are not a technical person and do not feel ready to "dive in" to the world of DIY electronics and LINUX, then Digital Yacht's new [iKommunicate gateway](http://ikommunicate.com) might be a good solution. This little black box will interface with your existing NMEA0183 and NMEA2000 systems and allow you to run Signal K mobile and web apps, without building your own Signal K server. iKommunicate can also work with either the Signal K Node or Java Server, to connect the NMEA0183 and NMEA2000 data to the Raspberry Pi via Ethernet.

If you just want to see how Signal K works and aren’t interested in connecting to real hardware you can skip down to
[installing the server](#server), otherwise continue on to learn how to interface your computer with your instrument
system.

### Connecting to NMEA 0183 Instruments
NMEA 0183 is specified as an RS-422 simplex network, however RS-232 (standard serial ports) work just as well for
connecting to an NMEA 0183 network. It is recommended that you use an opto-isolated interface between your computer and
the 0183 network to avoid damaging either your computer or instruments. A good option for this is the [Actisense
USG-1](http://actisense.com/products/nmea-0183/usg-1/usg-1) as it provides 1500V of isolation to protect your equipment
and proper differential signalling.

The USG-1 should be recognized as a serial device when it is connected to your computer and you should see a device
called `/dev/ttyUSB0` (the number could be different if there are multiple USB-to-serial adapters connected). Linux
assigns these device names automatically when the device is connected, so it could change. If you want to ensure that
the device always has the same name, you will need to write a UDEV rule to specify an alias. See [creating UDEV
rules](udev.html) for details.

To verify that you have a working connection, you can use picocom or another terminal emulator to see if you are
receiving data. The default baud rate for NMEA 0183 is 4800.

```
$ picocom -b 4800 /dev/ttyUSB0
```

You should see NMEA 0183 sentences scrolling off the screen. To exit picocom press `Ctrl-a` followed by `Ctrl-x`.

### Getting Started with NMEA 2000 Instruments
For NMEA 2000, you will need a NMEA 2000 gateway device such as the [Actisense
NGT-1](http://actisense.com/products/nmea-2000/ngt-1/ngt-1) which connects your NMEA 2000 bus to your server’s USB port.
Much like the USG-1, Linux should recognize the NGT-1 as a serial device and create the appropriate entry in /dev.
However some distributions do not do this. You will need to create a UDEV rule and a simple startup script to get this
device working. See [creating UDEV rules](udev.html) for details. **Important:** currently, the Node.js server cannot
natively parse NMEA 2000, you will need to install the [CANboat](https://github.com/canboat/canboat) suite of tools in
order to read data from the NGT-1 and convert it to a format that the server can understand. This is not necessary for
the Java server.

While Signal K data can be sent over any digital medium, it is designed primarily for Ethernet networks, so it makes
sense to have a network on your boat, either wired or wireless. It is possible to set up your Linux computer as a WiFi
access point, but that is outside the scope of this article.
[Here](http://xmodulo.com/raspberry-pi-wifi-access-point.html) is an example of configuring a Raspberry Pi as a WiFi
access point.

If you already have your instrument data available on your boat’s WiFi please drop us a note on the mailing list –
we are always looking for new interfaces to support.

## [Install Signal K Server](#) <a id="server"></a>

There are two options currently for serving Signal K data. The first is
[signalk-server-node](https://github.com/SignalK/signalk-server-node) and the second is
[signalk-server-java](https://github.com/SignalK/signalk-server-java).
