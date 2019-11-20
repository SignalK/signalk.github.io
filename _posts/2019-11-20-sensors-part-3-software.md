---
title: DIY Sensors with Signal K Part 3 - The Software
layout: post
author: Brian Smith
email: ba58smith at gmail dot com,
gravatar: https://avatars2.githubusercontent.com/u/15186790?s=400&v=4
status: published
---

This is my third and final post about using inexpensive microcontrollers to gather boat data and send it to Signal K. The [first one was an overview](http://signalk.org/2019/08/04/sensesp-sensors.html), the [second detailed the hardware](http://signalk.org/2019/08/20/sensors-part-2.html) involved, and this one will detail the software.

There are two main bits of software involved - the Signal K Server, and what I'll refer to as the Sensor Software. This post deals only with the Sensor Software - the software that is installed on the microcontroller to gather data from the sensors and then send it, over wifi, to the Signal K Server software. The Signal K Server software is most likely running on a Raspberry Pi, and you can read all about it on the [Signal K website](https://signalk.org). For purposes of this post, I will simply assume you have the Signal K Server up and running, and that you did a standard installation of it.

The Sensor Software _could be_ something that you write yourself. If you read the [Signal K specification](https://signalk.org/specification/1.3.0/doc/) and it makes perfect sense to you, then you might want to do just that. But if you're a more typical boater who's NOT a professional software developer, you'll probably want to tap into one of the Sensor Software projects that have already been developed, so that all you have to do is make the customizations necessary for the software to work with the specific sensors you want on your boat. The two projects that I'll cover in this post are called [SigkSens](https://github.com/mxtommy/SigkSens), and [SensESP](https://github.com/SignalK/SensESP). (If there are any others that are available, I'm not aware of them.)

### SigkSens

SigkSens was created by Thomas St. Pierre (@mxtommy on the Signal K Slack workspace), then further developed by him, with help from Matti Airas (@mairas on Slack).

- Compiled and uploaded to the microcontroller with the Arduino IDE or PlatformIO.
- Runs on ESP8266-based microcontrollers for sure, and should work with ESP32-based microcontrollers.
- Thoroughly documented on its [GitHub wiki page](https://github.com/mxtommy/SigkSens/wiki).
- New versions can be uploaded to the microcontroller via wifi, using OTA (Over The Air) updating.

Currently supports all of these sensors / sensor types:

- Any sensor that can be read with analogRead()
- Any sensor that can be read with digitalRead() (current state of a digital pin, and an interrupt counter on a digital pin)
- 1-Wire temperature sensors
- SHT30 temperature and humidity sensors
- MPU925X 9-axis IMU
- BMP280 barometric pressure sensors
- ADS1115 4-channel analog-to-digital converter

Because you can use the Arduino IDE, it will immediately be familiar to a lot of electronics hobbyists. You have to add about a dozen libraries to your Arduino installation, but adding libraries is a normal part of working with Arduino, and the process is well documented in the SigkSens documentation. Configuring sensors with a long url in a browser is a bit complex at times, but you do it only once per sensor. A lot of sensor types are already supported. Documentation is very detailed, written to the level of a very basic Arduino user.

SigkSens is installed as a typical (although complex) Arduino program, with one main program file calling functions that are distributed among a lot of other program files. You don't even modify the main program - you modify the `config.h` file to enable the sensors you need, and once the program is compiled and uploaded to the microcontroller, then you configure each sensor. All the wifi and Signal K connection stuff is handled - you don't need to do anything to make it work. Here's a [link to the main program file on GitHub](https://github.com/mxtommy/SigkSens/blob/master/SigkSens/SigkSens.ino) for you to peruse. Below is the url that you would enter in a browser to configure SigkSens to read the value of a light sensor connected to the AnalogIn pin of the microcontroller, and output it to Signal K:

`http://192.168.2.2/setSensorAttr?address=A0&attrName=a0&path=sensors.indoor.illumination`

### SensESP

SensESP was created by Matti Airas (@mairas), basing the wifi and Signal K connection stuff from SigkSens. Matti took the approach of making all of the functionality of SigkSens into a library that can be accessed in a short, mostly boilerplate `main.cpp` file. Lots of recent enhancements by Matti and Joel Kozikowski (@jkoz) have resulted in a programming method that's easy to understand and very flexible.

- Compiled and uploaded to the microcontroller with PlatformIO.
- Runs on ESP8266-based microcontrollers for sure, and should work with ESP32-based microcontrollers.
- Documentation includes full Class documentation and a few very thoroughly commented examples.
- Installation process is documented, although not in a lot of detail.
- New versions can be uploaded to the microcontroller via wifi, using OTA (Over The Air) updating.
- Currently supports these sensor types:
  ** Any sensor that can be read with analogRead()
  ** Any sensor that can be read with digitalRead() (current state of a digital pin, and an interrupt counter on a digital pin)
  ** 1-Wire temperature sensors
  ** GPS module

PlatformIO will not be familiar with a lot of electronic hobbyists, but as someone who was not familiar with it, I can say that it wasn't difficult to install and start using, and it has a lot more to offer than the Arduino IDE. In particular, you don't need to worry about libraries - PlatformIO handles them. Sensors are initially setup in the `main.cpp` file, and then can be configured at run-time through a simple web UI. Not as many sensors are currently supported as SigkSens, and adding new ones is likely to require help from the developers, but so far, they have both been willing to help with anything.

SensESP is used as a library, so to the end user, there is only one program file - `main.cpp`. The majority of the code in `main.cpp` is boilerplate, handling all of the wifi and the connection to Signal K. Each sensor is defined in `main.cpp`, with everything that's needed to get data from the sensor right there in `main.cpp`. Here's a [link to the example files on GitHub](https://github.com/SignalK/SensESP/tree/master/examples) - each one of them would be used by renaming it to `main.cpp`, then compiling it. Below are the few lines of code that you would add to the boilerplate of `main.cpp` to read the value of a light sensor connected to the AnalogIn pin of the microcontroller, and output it to Signal K, with some comments:

```
  // Create a pointer to a "sensor" that is the source of our data
  auto* pAnalogInput = new AnalogInput();

  // Run the output from the sensor through a "Linear" transport, with the default multiplier (1.0) and offset (0.0) and a path for the configuration,
  // then send the output from that to the Signal K server, with a display path.
  pAnalogInput -> connectTo(new Linear(1.0, 0.0, "/sensors/indoor_illumination"))
               -> connectTo(new SKOutputNumber("sensors.indoor.illumination"));
```

The `temperature_sender.cpp` example is complex, but very thoroughly documented, so it serves as an excellent tutorial.

### Comparison

Both projects have a bit of a learning curve, which is to be expected. If you're not familiar with either the Arduino IDE or PlatformIO, the former is probably simpler to learn, and only SigkSens can be used with the Arduino IDE. But PlatformIO isn't difficult, and it does have a lot more features - its ability to manage the libraries is a significant benefit, and its interface with the microcontroller is more robust.

Both projects support the two main "generic" sensor types: those that are accessed with analogRead() and digitalRead() - and that covers a LOT of sensor types that you may be interested in. (e.g., some temperature sensors, water/moisture sensors, motion detectors, light sensors, sound detectors, smoke and gas detectors, flame detectors, and more.) Both support the very common and very simple to use 1-Wire temperature sensors. SigkSens supports a few sensors that SensESP doesn't currently support, and SensESP supports GPS, which isn't currently supported by SigkSens. However, both projects are capable of supporting all of these sensors and a lot more, usually with only a small amount of additional programming.

### Conclusion

If all you want to do is deploy some basic sensor types around your boat and have them report to Signal K, either project is going to work great for that. If you're likely to get involved in the deeper programming aspects, such as adding code to support a new sensor, IMO, SensESP is probably a little better for that. My main engine temperature sensor runs SigkSens, and my main engine tachometer and alternator output monitor runs SensESP.

A cautionary note: this stuff can be addicting! You start with a couple of temperature sensors on your engine, and the next thing you know, you've got microcontrollers and sensors in every part of your boat, and ten more ideas bouncing around in your head. You have been warned.
