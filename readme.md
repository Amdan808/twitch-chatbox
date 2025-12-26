# 📺 Custom Twitch Chatbox Overlay

A lightweight, custom Twitch chat overlay designed for OBS Browser Source integration. Built as a learning project to practice HTML, CSS, JavaScript, and the Figma → code workflow.

![Light Theme Preview](preview-placeholder.png)

---

## ✨ Features

- **Live Twitch Chat** — Real-time chat display from any Twitch channel
- **Dark Mode** — Purple-accented dark theme with URL parameter control and system preference detection
- **Auto-scroll** — Messages automatically managed to fit viewport
- **Uppercase Transform** — All text displayed in uppercase for visual consistency
- **Clean Design** — Minimalist monospace aesthetic with JetBrains Mono font
- **OBS Ready** — Fixed 320px width, full-height layout for vertical placement

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/dirtex808/twitch-chatbox.git
cd twitch-chatbox
```

### 2. Configure Your Channel

Open `script.js` and change the channel name on **line 16**:

```javascript
socket.send("JOIN #YOUR_CHANNEL_NAME");
```

Replace `YOUR_CHANNEL_NAME` with the Twitch channel you want to display (Keep the `#`).

### 3. Add to OBS

1. In OBS, add a new **Browser Source**
2. Check **"Local file"** and browse to `index.html`
3. Set dimensions:
   - **Width:** `320`
   - **Height:** `1080` (or match your scene height)
4. Position the overlay on your scene

**That's it!** The chatbox will automatically connect and display live chat messages.

---

## 📁 Project Structure

```
twitch-chatbox/
├── index.html      # Main HTML structure
├── style.css       # Custom styles & CSS variables
├── reset.css       # CSS reset for consistency
├── script.js       # Twitch IRC connection & message handling
└── readme.md       # This file
```

---

## 🎓 What I Learned

### Twitch IRC via WebSocket

- Twitch chat uses **IRC protocol** over WebSocket at `wss://irc-ws.chat.twitch.tv`
- Anonymous read-only access is possible using `justinfan` + any number as nickname
- Must respond to `PING` messages with `PONG` to stay connected
- Chat messages arrive as `PRIVMSG` and need parsing to extract username/message

### WebSocket Fundamentals

- `WebSocket` API provides persistent, bidirectional communication
- Event handlers: `onopen`, `onmessage`, `onclose`, `onerror`
- Reconnection logic is essential for handling disconnects gracefully

### CSS Best Practices

- **CSS Variables** (`:root`) make theming and consistency much easier
- `flex-grow: 1` is powerful for filling remaining space in flex containers
- `overflow-wrap: anywhere` handles long words/URLs gracefully
- Viewport units (`vh`) are perfect for full-height layouts

### Understanding `:root`

The `:root` pseudo-class selects the document's root element — in HTML, that's `<html>`. While commonly used for CSS custom properties (variables), it's a general-purpose selector that accepts any CSS property.

**Key insights:**

- `:root` and `html` select the same element, but `:root` has higher specificity
- Custom properties defined on `:root` cascade down to all descendants automatically
- The `rem` unit is relative to `:root`'s font-size — setting `font-size` on `:root` creates a scalable foundation for the entire design
- In JavaScript, access `:root` via `document.documentElement` (a built-in shortcut to `<html>`)

**Theme switching pattern:**

```css
:root {
  --bg: white;
} /* Default theme */
:root.dark {
  --bg: #111;
} /* Active when <html class="dark"> */
```

```javascript
// Toggle dark mode
document.documentElement.classList.add("dark");
```

This works because adding a class to `<html>` triggers the `:root.dark` selector, which overrides the CSS variables — and those new values cascade to every element using them.

### URL Parameters & `window.location`

URL parameters (query strings) allow passing configuration to a page through the URL itself — no code changes required. This is ideal for OBS Browser Sources where you want different settings without maintaining multiple files.

**URL anatomy:**

```
https://example.com/page.html?theme=dark&volume=50
└─────── origin ──────┘└ path ┘└─── search (query) ───┘
```

**The `window.location` object** provides access to the current URL's components:

| Property                   | Example Value                              | Description                     |
| -------------------------- | ------------------------------------------ | ------------------------------- |
| `window.location.href`     | `https://example.com/page.html?theme=dark` | Full URL                        |
| `window.location.origin`   | `https://example.com`                      | Protocol + hostname + port      |
| `window.location.protocol` | `https:`                                   | Protocol (http: or https:)      |
| `window.location.hostname` | `example.com`                              | Domain name                     |
| `window.location.pathname` | `/page.html`                               | Path after domain               |
| `window.location.search`   | `?theme=dark`                              | Query string (including `?`)    |
| `window.location.hash`     | `#section`                                 | Fragment identifier (after `#`) |

**Reading parameters in JavaScript:**

```javascript
// URL: index.html?theme=dark
const params = window.location.search; // "?theme=dark"

// Simple check
if (params.includes("theme=dark")) {
  // activate dark mode
}
```

### Detecting System Preferences

The `window.matchMedia()` API queries browser/OS settings like dark mode preference:

```javascript
// Returns true if system is in dark mode
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
```

**Priority pattern for theme selection:**

1. URL parameter (explicit user choice) → highest priority
2. System/browser preference → fallback when no parameter specified

Note: Browser appearance settings can override OS settings — `prefers-color-scheme` reports what the browser decides, which may come from its own settings or the OS.

### DOM Manipulation

- Dynamic element creation with `createElement()` and `appendChild()`
- Using `scrollHeight` vs `clientHeight` to detect overflow
- Efficient message limiting by removing oldest elements first

### Figma → Code Workflow

- Having a design reference accelerates development significantly
- Extracting exact values (colors, spacing, fonts) from Figma ensures accuracy
- This workflow is **worth adopting** for future projects

---

## ⚙️ Configuration

### Theme Selection

Control the theme via URL parameter or let it follow system preference:

| URL                      | Behavior                               |
| ------------------------ | -------------------------------------- |
| `index.html`             | Auto-detects system/browser preference |
| `index.html?theme=dark`  | Forces dark mode                       |
| `index.html?theme=light` | Forces light mode                      |

**For OBS:** Uncheck "Local file" in Browser Source settings and enter the full path with your desired parameter:

```
file:///path/to/twitch-chatbox/index.html?theme=dark
```

### CSS Variables

All styling can be customized via CSS variables in `style.css`:

```css
/* Light theme (default) */
:root {
  --main-bg: #f1f3f4;
  --chatbox-bg: #ffffff;
  --secondary-bg: #f3f4f6;
  --txt-color: #1f2937;
  --txt-color-s: #7d7d7d;
  --txt-color-s-2: #2b2e48;
}

/* Dark theme */
:root.dark {
  --main-bg: #141414;
  --chatbox-bg: #0f0f0f;
  --secondary-bg: #1a1a1a;
  --txt-color: #dbb2ff;
  --txt-color-s: #bfbfbf;
  --txt-color-s-2: #bb86fc;
}
```

---

## 🔮 Future Features & Improvements

### ✨ Animations

- Fade-in effect for new messages
- Smooth slide-out for removed messages
- Subtle hover states (if interactive version needed)

```css
/* Planned animation example */
.message-box {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 🏆 Custom User Styling

Different visual treatment based on user type:

| User Type       | Styling Ideas                   | Animation                        |
| --------------- | ------------------------------- | -------------------------------- |
| **VIP**         | Gold username, special icon     | ✨ Shimmer/glow effect on entry  |
| **Subscriber**  | Purple accent, sub badge        | 💫 Gentle pulse on username      |
| **Moderator**   | Green highlight, mod badge      | Standard fade-in                 |
| **Broadcaster** | Red accent, crown icon          | 🔥 Special entrance animation    |
| **Power Users** | Custom colors based on activity | 🌊 Rainbow wave / gradient shift |

**Implementation:** Parse Twitch IRC tags for user metadata:

```javascript
// IRC messages include tags like:
// @badges=subscriber/12;color=#FF0000;display-name=Username;...
```

### 📋 Other Ideas

- [ ] Multi-chat support (TikTok, Kick, Youtube)
- [ ] Emote support (Twitch, BTTV, FFZ, 7TV)
- [ ] URL parameter for channel selection
- [ ] Message timestamps
- [ ] Sound alerts for specific users/keywords
- [ ] Chat filters (block specific words/users)
- [ ] Multi-channel support
- [ ] Message persistence (local storage)

---

## 🛠️ Technical Details

### How It Works

1. **Connection** — WebSocket connects to Twitch IRC server
2. **Authentication** — Uses anonymous `justinfan` credentials (read-only)
3. **Join Channel** — Sends `JOIN #channel` command
4. **Receive Messages** — Listens for `PRIVMSG` events
5. **Parse & Render** — Extracts username/message and creates DOM elements
6. **Limit Messages** — Removes oldest messages when container overflows

### No Server Required

This overlay runs entirely client-side. No backend, no API keys, no authentication required for read-only chat access.

---

## 📝 Original Project Goals

<details>
<summary>Click to expand original planning document</summary>

### Goal

- Design and implement a custom Twitch chatbox overlay
- Refresh HTML, CSS, and JavaScript skills
- Practice translating a Figma design into working code
- Evaluate the Figma → HTML/CSS/JS workflow
- Implement cross-platform chat integrattion
- Manage user database -> username | status -> custom styling

### Constraints

- No AI-generated production code
- AI used only for concept explanation and guidance
- Focus on learning value over feature completeness

### Time/Value Principle

- Optimize time vs. learning value
- Keep scope small and focused

</details>

---

## 📄 License

MIT License — feel free to use, modify, and share.

---

## 🙏 Acknowledgments

- **Cathy** — Inspired this project! Check out her work: [Twitch](https://twitch.tv/katy_v4) | [GitHub](https://github.com/CathyDolle)
- [Twitch IRC Documentation](https://dev.twitch.tv/docs/irc)
- [JetBrains Mono Font](https://www.jetbrains.com/lp/mono/)
- Built with vanilla HTML, CSS, and JavaScript
