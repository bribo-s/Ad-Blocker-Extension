# Ad Blocker Chrome Extension

Ad Blocker is a lightweight Chrome extension built with JavaScript, HTML, and CSS to reduce intrusive ads, clean up page clutter, and create a smoother browsing experience.

## Features

- Blocks common ad network requests with Manifest V3 declarative rules
- Removes banners, sponsored containers, and pop-up style overlays from loaded pages
- Uses a lightweight popup UI to show extension status
- Runs on most websites with a simple load-unpacked setup

## Project Highlights

- Reduced intrusive ads with a combined network and DOM filtering approach
- Improved browsing experience by removing banners, pop-ups, and page overlays
- Built with a clean Chrome Extension Manifest V3 structure

## Tech Stack

- JavaScript
- HTML
- CSS
- Chrome Extensions Manifest V3

## Local Setup

1. Download or clone this repository.
2. Open `chrome://extensions/` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the extension project folder.

## Project Structure

- `manifest.json` - Extension configuration
- `background.js` - Dynamic blocking rules and badge updates
- `content.js` - DOM cleanup logic for ads and pop-ups
- `content.css` - CSS rules for hiding common ad containers
- `rules.json` - Static declarative network request rules
- `popup.html` - Popup layout
- `popup.css` - Popup styling
- `popup.js` - Popup status handling

## Resume-Ready Summary

- Created a Chrome extension that reduces intrusive ads and improves browsing experience
- Developed ad-blocking logic to detect and remove banners, pop-ups, and video-style ad containers
- Combined static filtering, dynamic rules, and DOM cleanup in a lightweight front-end project
