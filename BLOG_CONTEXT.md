# Blog Post Context: SignalK MCP Server

## Project Overview

This document contains research findings for creating a blog post about the SignalK MCP Server project.

## Repository Information

### Upstream Repository

- **URL**: https://github.com/SignalK/signalk.github.io
- **Owner**: SignalK organization
- **Current Fork**: https://github.com/tonybentley/signalk.github.io.git

### Contributing Process

1. Website built with Astro and hosted on GitHub Pages
2. Local development requires Node.js
3. Run locally: `npm install` then `npm start` (serves at localhost:4321)
4. Code quality: `npm run fix` to auto-fix errors and check for issues
5. Blog posts are created using: `script/generate "Title of the new post"`
   - Creates file in `_posts` with current date
   - Uses template from `docs/blog-template.md`
   - Generates `.mdx` files (not `.md`)
6. Workflow: Write draft → Open pull request → Get reviewed

## Blog Post Template Structure

```yaml
---
publishDate: { date }
title: { title }
author: Your Full Name
# image: ~/assets/images/your-image.png or full URL (e.g., from unsplash.com)
category: Release | Tutorial | Case Study
tags: [tag1, tag2]
description: '1-2 sentence headline that becomes the first paragraph'
---
```

## Example Blog Post Analysis

### Recent Posts Reviewed

1. **KIP 3.0.0** (\_posts/2025/kip-3.0.0.md)

   - Category: Release
   - Format: Feature list with emoji headers
   - Includes screenshots
   - Links to GitHub releases
   - Technical but accessible

2. **TWatchSK Announcement** (\_posts/2022/twatchsk-announcement.md)
   - Category: Ecosystem/Hardware
   - Personal narrative style
   - Multiple images showing UI
   - Detailed feature walkthrough
   - Author included email and gravatar

### Writing Style Patterns

- Technical but approachable
- Use of specific examples and scenarios
- Screenshots/images to illustrate features
- Links to relevant resources
- Community-focused language
- Clear structure with headers
- Practical use cases highlighted

## SignalK MCP Server Project Details

### Description

The SignalK MCP (Model Context Protocol) Server provides AI agents with read-only access to marine data systems. Enables AI assistants like Claude to query vessel navigation data, monitor AIS targets, and access system alarms from SignalK installations.

### Key Features

- Real-time vessel data access
- AIS target monitoring
- System notifications tracking
- Live data streams
- Path discovery
- Connection monitoring
- Automatic reconnection

### Technical Requirements

- Node.js 18.0.0 or higher
- Access to a SignalK server (local or remote)

### Installation Options

1. **Recommended**: Use npx

   ```bash
   npx signalk-mcp-server
   ```

2. **Global installation**
   ```bash
   npm install -g signalk-mcp-server
   ```

### Available Tools/Commands

- `get_initial_context()`: Provides comprehensive system overview
- `get_vessel_state()`: Retrieves current vessel navigation data
- `get_ais_targets()`: Monitors nearby vessel information
- `get_active_alarms()`: Tracks system notifications
- `list_available_paths()`: Discovers SignalK data paths

### Configuration

- Uses environment variables
- Options for SignalK host/port
- Connection settings
- Authentication support
- Logging preferences

### Security & Safety

- Read-only operations
- No device control capabilities
- Graceful error handling
- Robust connection validation

### Integration

- Works with Claude Desktop
- Compatible with Claude Code CLI
- Flexible for different development scenarios
- Marine monitoring use cases

## Blog Post Strategy

### Target Audience

- SignalK users interested in AI/automation
- Developers exploring MCP protocol
- Marine enthusiasts wanting AI-assisted navigation
- Technical users comfortable with CLI tools

### Key Messages

1. First MCP server for marine data
2. Brings AI assistance to SignalK ecosystem
3. Safe, read-only access to vessel data
4. Easy to install and configure
5. Opens new possibilities for AI-assisted navigation

### Potential Categories

- Tutorial (if we focus on how-to)
- Release/Announcement (new tool announcement)
- Ecosystem (fits with other SignalK blog posts)

### Suggested Tags

- MCP, AI, Claude, ecosystem, navigation, developer-tools

### Content Outline

1. Introduction: What is MCP and why it matters for marine
2. What the SignalK MCP Server does
3. Key features and capabilities
4. Installation and setup
5. Practical use cases/examples
6. Security considerations
7. Getting started/next steps
8. Community call-to-action

## Real-World Usage: The Satori Project

### Project Background

**Satori** is a 1977 Westsail 32 sailboat (MMSI: 367603940) based in San Diego, CA. The owner uses the SignalK MCP server to enable AI-assisted boat monitoring and management through Claude Desktop.

### Conversational Boat Monitoring

The project demonstrates a unique use case: treating the boat as an entity that can be queried conversationally. Users can ask questions like "How is Satori?" and receive comprehensive status reports based on:

- Real-time SignalK data paths (vessel position, battery voltage, solar output, etc.)
- Historical time-series data from InfluxDB
- System alarms and notifications
- Environmental conditions (inside temp, fridge temp, bilge status)
- Engine parameters (when running)
- Tank levels (fresh water, holding tank)

### System Context Document

The Satori project maintains a comprehensive system context document (`satori-system-context.md`) that provides:

- Complete vessel specifications and systems inventory
- SignalK path references for all monitored systems
- Electrical system details (solar, batteries, charging)
- Historical performance data
- Operational guidelines and known issues

### MCP Tools Integration

The SignalK MCP server provides tools that Claude uses to:

1. **get_initial_context()** - Get comprehensive overview of boat systems
2. **get_vessel_state()** - Check current navigation/position data
3. **get_ais_targets()** - Monitor nearby vessels
4. **get_active_alarms()** - Review system alerts
5. **list_available_paths()** - Discover available data streams

### Practical Example Queries

The Satori project demonstrates natural language queries like:

- "How is Satori?" → AI retrieves battery levels, solar charging status, tank levels
- "Is the battery charging properly?" → AI checks voltage trends, solar output, charger status
- "What's the fridge temperature?" → AI reads environmental sensors
- "Show me power consumption over the last 24 hours" → AI queries InfluxDB time-series data

### Multi-System Integration

Satori's implementation combines:

- **2x Raspberry Pi computers**:
  - NMEA Pi: OpenPlotter + InfluxDB + MCP server
  - Venus Pi: VenusOS (Victron) for battery monitoring
- **Starlink**: Remote connectivity (24/7 at dock)
- **SignalK**: Central data hub aggregating NMEA 0183/2000
- **InfluxDB**: Time-series storage for historical analysis
- **ESP32 sensors**: Custom environmental and bilge monitoring

### Key Insight for Blog

This demonstrates the transformative potential of MCP + SignalK: instead of checking multiple dashboards and graphs, boat owners can have natural conversations with AI about their vessel's status, receiving intelligent analysis and proactive alerts.

## Detailed Conversation Examples from Satori

### Statistics from Analysis

- **89 conversations** about Satori/SignalK (out of 571 total)
- **252 SignalK tool calls** made
- **192 InfluxDB tool calls** for historical data
- Conversations span June-October 2025

### Example 1: Natural Status Check

**User Query:** "how is satori doing today? batteries, and environment conditions?"

**Tools Called:**

- `signalk:get_vessel_state` - Overall status
- `signalk:list_available_paths` - Discover available data
- Multiple `signalk:get_path_value` calls for specific metrics

**AI Response Included:**

- Battery: 100% state of charge, 13.45V, 13.4A draw
- Solar: 5.44 kWh generated today (combined from 2 controllers)
- Environment: 26.8°C, 42.3% humidity
- Bilge: Both forward and aft dry (no flooding)

**Key Takeaway:** Single natural question triggers comprehensive system analysis across multiple data sources.

### Example 2: Historical Battery Analysis

**User Query:** "how has the main battery doing. was it charged today?"

**What Happened:** AI seamlessly switched from real-time SignalK to historical InfluxDB data to show battery's journey through the day:

- Started at 99.8% at midnight
- Dropped to 96.9% by 2:30 AM (overnight discharge)
- Charging began at 3:00 AM
- Reached 100% by 4:30 AM and stayed there

**Key Takeaway:** MCP enables narrative analysis of time-series data, not just raw numbers.

### Example 3: Solar Comparison

**User Query:** "how much solar energy did satori get today compared to yesterday?"

**Result:** AI automatically queried both controllers and provided:

- Today: 5.44 kWh total
- Yesterday: 6.12 kWh total
- Difference: -0.68 kWh (11% less, likely due to weather)

**Key Takeaway:** Comparative analysis without writing queries or opening dashboards.

### Example 4: Situational Awareness

**User Query:** "what is the nearest vessel to satori right now"

**What Happened:**

- Queried AIS targets via SignalK
- Got Satori's current position
- Calculated distances using Haversine formula
- Identified nearest vessel: MMSI 338311884, only 51 meters away

**Key Takeaway:** Complex spatial calculations and contextual analysis from simple natural language query.

### Example 5: Anomaly Detection

**User Query:** "how is satori doing? check for the past three weeks for any anomolies"

**What Happened:**

- Found active "Aft bilge has water" alarm
- Queried 3 weeks of historical data (bilge sensors, battery, power)
- User clarified alarm was brief/false
- AI provided context showing no pattern of issues

**Key Takeaway:** Combines real-time alarms with historical patterns to distinguish false alarms from real problems.

### Common Query Patterns Observed

1. **Morning check-ins:** "How is Satori?" - overnight charging, weather
2. **Comparative analysis:** "Today vs yesterday" - solar, power consumption
3. **Troubleshooting:** Checking alarms, investigating anomalies
4. **Environmental monitoring:** Temperature, humidity trends
5. **Situational awareness:** Nearby vessels, position data

### Most Frequently Accessed SignalK Paths

- `electrical.batteries.*.voltage`
- `electrical.batteries.*.capacity.stateOfCharge`
- `electrical.solar.*.yieldToday`
- `environment.inside.temperature`
- `environment.inside.humidity`
- `environment.bilge.*.flood`
- `navigation.position`
- `navigation.speedOverGround`

### The "Satori Effect"

Users develop a conversational relationship with their boat. Instead of "checking systems," they're "asking how Satori is doing" - a fundamentally different interaction model that's more intuitive and human.
