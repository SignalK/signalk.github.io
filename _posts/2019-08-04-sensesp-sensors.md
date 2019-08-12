---
title: DIY sensors with Signal K
layout: post
author: Brian Smith
email: ba58smith at gmail dot com,
gravatar: https://avatars2.githubusercontent.com/u/15186790?s=400&v=4
status: draft
---

When we bought our 14 year old trawler in 2016, I knew I wanted to improve the instrumentation. Not only the obvious things (chart plotter, radar, sonar, etc.), but also data about the engine that would alert me to a problem long before the engine started coming apart. At the Miami Boat Show, I stumbled across the Digital Yacht booth, where they were showing some equipment that used a new marine data standard called Signal K. It would let you see all the data from your boat’s data network (NMEA 0183 and 2000) on any smartphone, tablet, or computer screen, via wifi. *COOL!*, I thought!

But I quickly realized that my main issue is not that I don’t have a good way to view all the available data - it’s that I don’t HAVE the data that I want. Being an older boat, the Isuzu diesel engine doesn’t use any of the electronic engine monitoring systems that newer engines have. The only engine data I have available is analog, and it’s sparse: tachometer, coolant temperature, and oil pressure. Also, it’s not accurate. I wanted accurate data, and I wanted a lot MORE data: the voltage output of both alternators; the temperature of both alternators, the raw water exhaust elbow, the turbocharger, and the air in the engine room; the status of my four bilge pumps, and the water level in each bilge. And why not have a way to know if there’s water, or even moisture, in a few places on the boat that are supposed to be dry all the time, but sometimes get water in them? And how about an alert if the black water tank is getting full and I don’t notice? And… and… and… ad infinitum.

I knew that if I could get that data into digital format, and onto my NMEA network, I could see it - at least some of it - on my Raymarine MFDs - but I still didn’t know how I was going to acquire the data. I had played around with some Arduinos a few years earlier, and I knew they were good at acquiring data, but I had no idea how to make all that data available when and where I wanted it (mainly at the flybridge helm station while underway). I spent hours Googling for a solution, and was just about to start building a mySQL database and some PHP web pages when I decided to check in on Signal K again. That’s when I found @mxtommy, and @mairas, and a cool project they had developed called [SigkSens](https://github.com/mxtommy/SigkSens).  The project’s purpose was to use readily available inexpensive hardware to acquire data with a wifi-enabled microcontroller, and send it to a [Signal K](https://github.com/SignalK) server running on a Raspberry Pi. Signal K would then serve it up over the boat’s wifi network, making it available on any device that could run a browser. **EXACTLY WHAT I WAS LOOKING FOR!**

![Boat data on my phone](https://user-images.githubusercontent.com/15186790/60998019-29fc5c00-a326-11e9-9591-205cff5ed07b.png)

I dove in. SigkSens (along with the Signal K server) is an open source project, meaning that it’s freely available to anyone who wants to download it, and that anyone can contribute to it to make it better. Although I was in the software business most of my working life (26 years), I only ever did a tiny amount of programming, so I couldn’t help much with that. But I know how to write documentation! So I did - I completely documented SigkSens, so that anyone with even a little experience with Arduinos could get it up and running. And I now have a Wemos D1 Mini microcontroller (think “Arduino”, but with an ESP8266 processor and built-in wifi) with four OneWire temperature sensors acquiring data that I can see on my phone while underway: main engine coolant temperature, main engine raw water exhaust elbow temperature, 12V alternator temperature, and 24V alternator temperature. Soon, I’ll add the turbocharger temperature, acquired with a type K thermocouple running through a MAX31850 thermocouple amplifier breakout board and into the Wemos.

![ME monitor](https://user-images.githubusercontent.com/15186790/60998528-14d3fd00-a327-11e9-85af-0d3a36384a27.png)

A few months ago, my long-time business partner (the one with all the programming experience), @jkoz, expressed an interest in getting better data on his boat, and I told him about Signal K, SigkSens, and a new project, [SensESP](https://github.com/SignalK/SensESP), started by @mairas. It borrows heavily from SigkSens, but takes a very different approach to how it addresses the hardware and sends the acquired data to Signal K. @jkoz gravitated toward the newer project, and has since made several contributions. He now has data from his Westerbeke generator going through a Wemos D1 Mini into Signal K, and also to a [small digital display](https://wiki.dfrobot.com/2.2_inches_TFT_LCD_Display_V1.0_(SPI_Interface)_SKU_DFR0529) he found that fits perfectly into the hole where the original Westerbeke gauge was.

![jkoz temp gauge](https://user-images.githubusercontent.com/15186790/62142929-2755ac80-b2bd-11e9-9753-f22e7a1d722e.png)

In addition to the examples above, SigkSens and SensESP are being used:
- as a chain counter and windlass controller
- to provide accurate engine RPM data
- to provide tank level data
- as a heading indicator, using two GPS modules connected to the Wemos
- to provide fuel flow data

But any data that you can acquire with a sensor that works with a microcontroller should be able to be sent to Signal K with one of these projects. Examples that come to mind include:
- bilge level monitoring
- counting bilge pump cycles per hour
- did you leave the light on in the engine room? (Or the coffee maker in the galley?)
- maximum pitch and roll during a trip

### Simple Example
To give you an idea how simple this can be, below are the FOUR LINES OF CODE that were written to output the value of a common 0 - 180 ohm variable resistor-type tank level sensor, as a percentage. (There’s other code in the program, of course, but it’s all boilerplate, nothing you have to write - this is the only sensor-specific code.) This example uses SensESP.

```
// 1. connect to the only AnalogIn pin on an ESP8266

AnalogInput* input = new AnalogInput();

// 2. calculated ohm-to-percentage conversion factor

float scale = 0.001149425F;

 // 3. output a moving average of the last 10 AnalogReads

MovingAverage* avg = new MovingAverage(10, scale); 

// 4. Convert AnalogInput (ohms) to a moving average of tank level percentage,
// which gets sent to Signal K with the appropriate display path

input -> connectTo(avg) -> connectTo(new SKOutputNumber("tanks.fuel.0.currentLevel"));
```

You can see the entire example at https://github.com/SignalK/SensESP/blob/master/examples/fuel_level_sensor/main.cpp

### Additional Reading
- Signal K: http://signalk.org and https://github.com/Signalk
- SigkSens: https://github.com/mxtommy/SigkSens/wiki
- SensESP: https://github.com/SignalK/SensESP and https://github.com/SignalK/SensESP/tree/master/examples 
- A very thorough SensESP example with lots of comments: https://github.com/SignalK/SensESP/blob/master/examples/temperature_sender.cpp


