---
title: Harnessing Signal K to dynamically map seabeds along ports and rivers
layout: post
author: Roee Hasson
email: roeeh at docktech dot net
gravatar: https://s.gravatar.com/avatar/88441d535dbffdcb4da9957562115564?s=80
---
​
Ports and rivers are an essential part of the global supply chain, being the main channels through which most of the world trade passes. Nevertheless, there is no dynamic mapping of the enviroment, no constantly updating data regarding the enviromental conditions (e.g. depth, water temperature, wind direction and magnitude). This lack of updated information severly affects cargo utlization and safety of navigation, as there is signifance change on a daily, and sometimes hourly, basis.
​
Having identified this need, we at [DockTech](https://www.docktech.net/) sought to find a solution for this problem. To create a way of understanding the real-time environment conditions and present them in a way that can readily be used to derive crucial insight and increase port efficiency. At the heart of our solution are IoT devices collecting the sensors' already-generated data from vessels operating within the ports.
​
![Depth map](https://user-images.githubusercontent.com/63849102/165550515-a9935fe4-fc5d-4c35-b119-dbaf8406f675.png)
​
*Depth map, showing the latest measured depths from the past month, at every point the tugboats covered. Shallow areas appear in red, green are deep areas, and yellow in between. Santos port, Brazil*
​
While sensor data from any vessel is useful, DockTech chose to focus on tugboats, as they move all around the port during the course of their regular operations. However we still needed to find a way to communicate with the very specific NMEA protocol in order to retreive the data, and that's where Signal K comes in!
​
Using a simple raspberry pi, a serial-to-USB converter, cloud services, the [Signal K central server implementation](https://github.com/SignalK/signalk-server) and a light-weight Signal K client we created, we managed to collect data from various NMEA0183 devices, mostly GPS units and Echo Sounders.
​
![Coverage map](https://user-images.githubusercontent.com/63849102/165550616-64fe99dc-bd1f-493c-abbf-ec6cf0c5af19.png)
​
*Coverage map, showing all the points around the port the tugboats visited in a chosen time interval. Santos port, Brazil*
​
With a constant stream of data coming from across the ports, our data science team generates insights regarding the port's conditions and environmental trends. For example, besides for just getting an updated bathymetry across the port, we are able to detect regions that are shallower than the desired depth, and calculate the approximate amount of dredging that would be neccesary. Additionally, we found areas of high deposition and high erosion caused by high silting rates, and can alert the relevant operators about potentially dangerous sections of the port.
​
![Vessel Tracker](https://user-images.githubusercontent.com/63849102/165550715-c01a261b-00c2-441c-9c66-0fb787a0e097.png)
​
*The routes of the tugboats operating in the port during a chosen time interval. Santos port, Brazil*
​
While Signal K helped us with the data collection process, it is important to stress that several crucial steps need to be included to turn the raw data into a reliable bathymetry. Including, but not limited to, enriching the data with contextual meteocean variables (e.g. tide), removing noise (there is between 2-8% per depth sensor), interpolating non-covered regions, etc. 
​
![Sedimentation map](https://user-images.githubusercontent.com/63849102/165550760-2949952d-7e81-4e06-ad56-f2d8fc62b83d.png)
​
*Sedimentation map, showing the silting movement in the port between two specific dates. In red are areas of high deposition, in green, high erosion, and the rest are stable areas. Santos port, Brazil*
​
The relevance and impact of a constantly updated port bathymetry is still in it's infancy, and we at DockTech are working on the next generation of port maintenance. With a continous understanding of the port conditions, forecasting algorithms can be trained to predict future dredging campaigns, navigation routes for autonomous ships can be maximized for UKC (under keel cleareance), and causual induction as to the impact of particular weather conditions (e.g. storms) can be investigated.
​
![High deposition polygons](https://user-images.githubusercontent.com/63849102/165550802-89111951-c123-473f-8c37-481523895f65.png)
​
*Detecting high deposition polygons in the port. The areas are dangerous due to grounding hazard. Santos port, Brazil*
​
This is just a glimpse of what can be acheived by extracting data from vessels, and it was made simple to achieve using the Signal K open data format.
​
​
​
*Want to hear more about our work? Feel free to contact us at info@docktech.net*