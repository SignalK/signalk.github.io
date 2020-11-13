---
title: How to include anything in Grafana
layout: post
author: Sam Zadworny
email: zado1984@gmail.com
---

## Introduction

Many people have added InfluxDB and [Grafana](https://grafana.com/) to their setup, but there's one major problem - you still need to switch between screens or windows to view various apps. I've got solution for it ...let me show you how to display anything in Grafana. And 'anything' means things that you can access from your web browser. All you need to do is just add a new `Text` panel to your Grafana dashboard, use "iframe" block in the content, and apply one little fix to Grafana ini file. Result: better user experience, because you have everything in one place. It's more like a workaround, but it works perfectly well. Details below.

## Instruction

1. Login to Grafana, and add a new panel: click the first button on the top-right hand corner titled `Add panel`, and then `Add new panel` blue button in the new box.
![screenshot#1](https://github.com/zadworny/signalk.github.io/blob/master/images/display-anything-in-grafana-1.png?raw=true)

2. Now focus on the setting in the `Panel` section on the right-hand side. First, insert any title you like in `Settings`. Then scroll down to `Visualisation` tab, and choose `Text` plugin.
![screenshot#2](https://github.com/zadworny/signalk.github.io/blob/master/images/display-anything-in-grafana-2.png?raw=true)

3. Below that in the `Display` section, select `HTML` mode and insert the following in the `Content` textarea:
```<iframe src="http://localhost:3000/@signalk/maptracker/" title="Map Tracker" style="width:100%; height:100%; padding:0; margin:0; border:none;"></iframe>```
In the src="" insert an URL address of your choice - http://localhost:3000/@signalk/freeboard-sk/ is just for the tutorial purposes. Click the blue `Apply` button on the top-right hand corner to save the changes.
![screenshot#3](https://github.com/zadworny/signalk.github.io/blob/master/images/display-anything-in-grafana-3.png?raw=true)

5. Click `Save dashboard` - the second button on the top-right hand corner
![screenshot#4](https://github.com/zadworny/signalk.github.io/blob/master/images/display-anything-in-grafana-5.png?raw=true)

6. You can add more panels like this, and organise your dashboard however you like.
![screenshot#5](https://github.com/zadworny/signalk.github.io/blob/master/images/display-anything-in-grafana-6.png?raw=true)


**FIX:** The Grafana's `Text` plugin may not work with HTML code by default, and you may need to fix it in 3 simple steps:
- Open Grafana ini file, it's usually located in `signalk_volume/grafana/conf/defaults.ini`
- Find `disable_sanitize_html` value and change it from `false` to `true`
![screenshot#6](https://github.com/zadworny/signalk.github.io/blob/master/images/display-anything-in-grafana-7.png?raw=true)
- Save the file and restart Grafana
- Source: [https://github.com/grafana/grafana/blob/v6.0.0/CHANGELOG.md#breaking-changes-1](https://github.com/grafana/grafana/blob/v6.0.0/CHANGELOG.md#breaking-changes-1)
