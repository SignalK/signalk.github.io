---
title: KIP 3.0 is out!
author: David Godin
publishDate: 2025-04-26
category: Release
tags: [KIP, Ecosystem]
image: https://raw.githubusercontent.com/mxtommy/Kip/master/images/KIPDemo.png
excerpt: KIP 3.0 delivers a vastly improved user experience across desktops, tablets, and mobile devices. Whether you're fine-tuning your helm setup or creating a custom dashboard for your nav station, KIP v3.0 gives you more flexibility, clarity, and control than ever before.
---

We’re excited to announce the release of **KIP v3.0**, the latest major version of the Signal K Instrument Panel — a customizable, responsive dashboard for marine data built by and for the open boating community.

Version 3.0 is our biggest update yet, delivering a vastly improved user experience across desktops, tablets, and mobile devices. Whether you're fine-tuning your helm setup or creating a custom dashboard for your nav station, KIP v3.0 gives you more flexibility, clarity, and control than ever before.

## 🚀 New Features

- **Touch-first user experience** with keyboard hotkey support for desktop users.
- **Fullscreen dashboards** with the bottom navbar removed — great for helm stations and large displays.
- **All-new grid layout** enables simple drag-and-drop widget rearrangement.
- **Deep black and true white themes** designed for optimal contrast in direct sunlight.
- **Seven new high contrast colors** help you stay informed at a glance.
- **Widget duplication** for faster dashboard creation.
- **Dynamic zone-based gauge color reactions** enhance situational awareness.
- **Zone override support** allows widgets to ignore zones when needed.
- **Unit label toggle** for paths that are inherently unitless.
- **New widgets**:
  - Position widget (thanks to @Mantas)
  - Slider widget
  - Label widget
- **Dashboard page management**: label, reorder, and duplicate entire pages.
- **New Night Mode option**: Brightness+Sepia for low-light usability without losing color fidelity.
- **Streamlined configuration**: Easily back up or share your setup with config file download/upload.
- **Redesigned notifications** for a cleaner, more intuitive interface.
- **Enhanced Data Inspector**: Now shows which paths support PUT operations.
- **New unit options**: Inch, millimeter, and fuel economy (thanks to @emonty).
- **Redesigned Help section** for easier onboarding and support.
- **Improved responsive design** makes KIP more usable on all screen sizes.

![Screenshot](https://raw.githubusercontent.com/mxtommy/Kip/refs/heads/master/images/KIPDemo.png)

## 🛠️ Fixes and Improvements

- Fixed label cutoff in Boolean Panels ([#582](https://github.com/mxtommy/Kip/pull/582))
- Fixed time conversion losing sign in HH:MM:SS format ([#581](https://github.com/mxtommy/Kip/pull/581))
- Resolved token renewal loop issue (#580)
- Fixed Boolean toggle push mode visual feedback issue on touchscreens ([#579](https://github.com/mxtommy/Kip/pull/579))

---

KIP continues to evolve thanks to the contributions of our passionate Signal K community. We’re proud to keep the project 100% free and open source, so every boater can customize their onboard experience without limitations.

Search for "KIP" in the Signal K appstore to find the latest version, or explore the full changelog on [GitHub](https://github.com/mxtommy/Kip/releases/latest).

Happy sailing! ⛵
