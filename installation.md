---
title: Installation
layout: rsidebar
installation: active
sidebar: installation-sb.html
description: "Follow these instructions to get started with Signal K. Please don’t hesitate to ask the community for
  help if you run in to trouble."
---

**If you have questions or run in to any issues following these instructions, please be sure to ask on the Signal K
[mailing list](mailto:signalk@googlegroups.com) and someone in the community will be sure to help you out.**

## [Get Your Hardware <small>(Connected)</small>](#) <a id="hardware"></a>
While it is pretty likely that all of the Signal K software will run on Windows and OS X just as well as Linux, we have
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
[signalk-server-java](https://github.com/SignalK/signalk-server-java). All of the examples below are written assuming
you are using [Debian](https://debian.org) or a derivative ([Ubuntu](http://ubuntu.com),
[Raspbian](http://raspbian.org), etc.). If you are using a different Linux distribution, adjust the commands
accordingly.

### Signal K Server Node
First, the prerequisites.

```
$ sudo apt-get update
$ sudo apt-get install -y curl git build-essential
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

See [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/) for more information about
the above commands.

Now that those are installed, you will need the Signal K server itself.

```
$ git clone https://github.com/SignalK/signalk-server-node.git
$ cd signalk-server-node
$ npm install
$ bin/nmea-from-file
```

This will start the server with a sample configuration file. See the
[README](https://github.com/SignalK/signalk-server-node) for more details.

## [Install User Interfaces](#) <a id="client"><a/>
All of these user interfaces can be installed with bower to the Node Signal K server. Run `bower` in the root directory
of your Node Signal K server:

```
$ sudo npm install -g bower
$ bower install https://github.com/SignalK/instrumentpanel.git
$ bower install https://github.com/SignalK/sailgauge.git
$ bower install https://github.com/SignalK/maptracker.git
$ bower install https://github.com/SignalK/simplegauges.git
```

After the installation you can access these with URLs like `http://localhost:3000/instrumentpanel`. Your Signal K server
must be running to serve the html files and provide the data stream.
