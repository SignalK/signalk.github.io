---
title: Announcing TWatchSK - Signal K On Your Wrist
layout: post
author: Brian Smith
email: ba58smith at gmail dot com
status: published
gravatar: https://avatars2.githubusercontent.com/u/15186790?s=400&v=4
publishDate: 2022-01-18
excerpt: TWatchSK brings Signal K data and notifications directly to your wrist using the LILYGO® T-WATCH-2020, offering a customizable and user-friendly experience with no coding required. With features like DynamicViews, Signal K Notifications, and seamless integration via WiFi, it enhances convenience and safety on your boat.
tags: [hardware, ecosystem, smartwatch, notifications]
---

On January 12, @Jan Dytrych released a very cool new addition to the Signal K ecosystem: TWatchSK. It puts Signal K right on your wrist, so it's always with you, wherever you are on your boat!

The hardware is the LILYGO® T-WATCH-2020, which you can find all over the Internet for US$35 to 60. The software is completely free and open source, and [available on GitHub](https://github.com/JohnySeven/TWatchSK). (Development has been done on version 1 of the T-WATCH-2020. @Jan is currenlty making sure it will work with version 2.)

<img src="https://user-images.githubusercontent.com/15186790/149951744-9426eb2c-d04e-4c16-aa08-4785fcaee0cc.png" alt="Home Screen" width="260"/>

_Home screen, showing date, time, the name you've given your watch, and icons for the step counter, Signal K status, Wifi status, and battery status._

Of course it functions as a watch, but the magic is that it automatically displays all Signal K Notifications, and can easily be set up to display data from any Signal K Path. Imagine you're cruising along, and you get the following Notification from Signal K:

<img src="https://user-images.githubusercontent.com/15186790/149951793-35c792a1-a671-4640-abf4-470d7bb43901.png" alt="Low Voltage Warning" width=260/>

_Display of any Notification from Signal K_

With a couple of swipes on the watch face, you get to a screen that looks like this one, called a DynamicView: except that you've set it up to display information about your engine, including alternator output voltage, which will update every second:

<img src="https://user-images.githubusercontent.com/15186790/149951809-2f87b3a3-4294-4392-9b45-9e45762394ab.png" alt="Watch Stats DynamicView" width=260/>

_This example shows stats about the watch itself, but your DynamicViews will show whatever Signal K Path you want!_

I've been fortunate to have worked with @Jan on this project for well over a year, and have used it on my boat in exactly the above scenario. The peace of mind that comes from knowing I'll learn about a potential problem as soon as it develops is fantastic!

A significant benefit of TWatchSK is that there is NO CODING for the end-user. All basic configuration is done through a simple touch interface on the watch, and all screen design (like the image above) is done through the companion program [TWatchSK Designer](https://github.com/JohnySeven/TWatchSKDesigner#twatchskdesigner), which runs on your desktop or laptop computer. You follow the simple installation instructions for Designer, connect your watch to your computer, and Designer will load the firmware onto the watch. Then you layout your DynamicViews in Designer, which are saved to your Signal K Server, and with a touch of a button on the watch, the DynamicViews are installed.

<img src="https://user-images.githubusercontent.com/15186790/149958975-85643519-7302-4f71-94c9-a1366b9c5632.png" alt="Designer Preview and Actual Watch Screen" width=520/>

_DynamicView: how it looks in the WYSIWYG Designer (left), and on the watch (right)._

TWatchSK connects to Signal K through your boat's wifi network. If you get out of wifi range, you'll get a message, and the watch will try to reconnect several times, or you can disable wifi if you're going to be off the boat for a while.

<img src="https://user-images.githubusercontent.com/15186790/149958091-61256132-c60d-4af3-b316-6d82174eab46.png" alt="Can't Connect to Wifi" width=260/>

The screen turns off after a timeout period that you set, which helps the battery last up to 24 hours when connected to Signal K. The screen wakes up whenever a Notification is received, or when you touch the screen, or simply turn the screen towards your face!

You can switch between day and night mode by simply double-tapping the screen.

All of this is just version 1.0! Already in the works for version 2.0 are switch control (turn your anchor light on from anywhere on the boat!), and basic autopilot control! So what are you waiting for? Buy your watch and get Signal K on your wrist now!

_(Would you like to have TWatchSK in a language other than English? Almost every label on every screen is defined in a single "localization" file which can be modified to work with most languages.)_
