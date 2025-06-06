---
title: SensESP 1.0.0
layout: post
author: Matti Airas
email: mairas@iki.fi
status: published
publishDate: 2020-12-18
excerpt: SensESP 1.0.0 is a powerful Signal K sensor development library for ESP8266 and ESP32, enabling users to create custom hardware sensors for boats with ease. This release introduces features like Signal K metadata support, PUT requests, smart switches, and improved configuration, making it a versatile toolkit for marine applications.
tags: [hardware, sensESP]
category: Releases
---

Hi all,

_(Before you ask: SensESP is a Signal K sensor development library for ESP8266 and ESP32. It can be used as a high-level toolkit for creating ESP-based hardware sensoring devices that interface with Signal K servers. In practical terms, you can use it to create temperature or engine RPM sensors, tank level sensors, anchor chain counters, satellite compasses, bilge level alarms, or smart light controllers for your boat.)_

I am happy to announce the release of SensESP 1.0.0. Development has progressed at a rapid pace recently, thanks to all the great work done by the **Brian Smith** (@Butch at Slack), **Joel Koz** (@jkoz at Slack), and all our wonderful contributors and users! We've discussed doing a mythical, magical 1.0 release for some time already, and we think we finally have the worst bugs squashed out to warrant the release. On Dec 16 Joel finally took the step... no, steps... no, dance, no, the exquisite, intensive, passionate and fast paced rumba of our release process, resulting in a **beautiful, perfect version 1.0.0 release!**

![IMG_20201217_234130](https://user-images.githubusercontent.com/1049678/102636535-7378e980-415d-11eb-9768-0c90d1856176.jpg)

_A custom-built ESP32 development board in a waterproof enclosure, all ready waiting for new aquatic adventures!_

The previous release, 0.5.1, was done on Nov 4. Since then, some of the notable new features include:

- Support for Signal K metadata. SensESP can now provide information such as units, names, and description of the paths it is producing values for.
- Support for both incoming and outgoing [Signal K PUT requests](https://signalk.org/specification/1.5.0/doc/put.html) (can both control other devices and receive commands)
- A new LambdaConsumer for creating low-overhead consumer classes
  System status producer for implementing better status displays
- Support for button UIs with debouncing and double/long click detection
- Support for smart switches (networked remote controlled switches)
- Support for RGB leds
- Improvements in how the software is configured and initialized
- Awesome new interactive Doxygen [class documentation](https://signalk.org/SensESP/generated/docs/annotated.html)

Additionally, a LOT of bugs have been fixed.

![grafana_engine](https://user-images.githubusercontent.com/1049678/102636567-7d025180-415d-11eb-9cfd-227ff4ba837c.png)

_SensESP generated data in Grafana: engine RPM and oil, coolant, and exhaust temperatures_

We definitely intend to continue the development. The complexity of the project has been a major pain point, with the build system breaking all too often. Also, code compilation takes a long time, and the software eats a lot of memory, both flash and RAM. These will be tackled by breaking up the monolith: hardware-specific components such as the BMx280 temperature sensors will be split away from the core software. In the future, they have to be explicitly included, but the gains in build times and build system stability will be well worth it.

At the moment, SensESP is rather tightly integrated with Signal K: it only supports a Wifi data link layer with websockets and Signal K as the session and application layers. I and Joel have been musing about modularizing all this. It should be possible to use wired ethernet instead of Wifi; UDP broadcasts instead of WebSocket; or even CAN bus and NMEA 2000. Heck, it should be possible to have Signal K deltas over CAN bus! The basic building blocks of SensESP (the ReactESP reactive programming framework and the abstractions of observables, observers, producers, consumers, sensors, and transports) are easily flexible enough for that.

#### Now, it's your turn: go and do something wonderful with SensESP!

- GitHub project: https://github.com/SignalK/SensESP
- Getting started documentation: https://github.com/SignalK/SensESP/wiki/SensESP-Overview-and-Programming-Details
- Class documentation: https://signalk.org/SensESP/generated/docs/annotated.html
- Examples: https://github.com/SignalK/SensESP/tree/master/examples
- Discussion and support: The #sensors channel on [Signalk-dev Slack](https://signalk-dev.slack.com).
