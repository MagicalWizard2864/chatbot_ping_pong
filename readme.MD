A modern, responsive chat bot interface built with HTML5, CSS3, and JavaScript. Features a clean, professional design inspired by Claude/ChatGPT with a compact sidebar that expands on hover for optimal screen space utilization.

## 🚀 Features

### Core Functionality
- **Real-time Chat Interface**: Send messages and receive AI responses with typing indicators
- **Message History**: Automatic chat history tracking with clickable history items
- **Auto-resizing Textarea**: Input field that grows with content
- **Welcome Screen**: Interactive suggestions to get started

### Advanced Features
- **Compact Sidebar**: 72px width by default, expands to 280px on hover (desktop)
- **Mobile Responsive**: Full overlay sidebar on mobile devices
- **Dark Mode Toggle**: Switch between light and dark themes
- **New Chat**: Start fresh conversations
- **Export Chat**: Download chat history as text file
- **Keyboard Shortcuts**:
  - `Ctrl/Cmd + K`: Toggle sidebar
  - `Ctrl/Cmd + D`: Toggle dark mode
  - `Ctrl/Cmd + N`: New chat
  - `Ctrl/Cmd + E`: Export chat

### UI/UX Features
- **Full-Screen Layout**: Maximum chat area with accessible sidebar features
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Accessibility**: WCAG AA compliant colors and focus states
- **Professional Typography**: Inter font with optimized loading
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🛠️ Technology Stack

- **HTML5**: Semantic markup with accessibility attributes
- **CSS3**: Custom properties, Flexbox, Grid, animations, and responsive design
- **JavaScript/jQuery**: DOM manipulation, event handling, and localStorage


## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb) - High contrast, accessible
- **Secondary**: Violet (#7c3aed) - Accent color
- **Neutrals**: Slate color family for text and backgrounds
- **Sidebar**: Dark theme (#0f172a) with proper contrast ratios

### Typography
- **Font Family**: Inter (400, 500, 600, 700)
- **Hierarchy**: Consistent scale with proper line heights
- **Letter Spacing**: Optimized for readability

### Spacing
- **Scale**: 4px base unit (0.25rem) with consistent ratios
- **Components**: Proper padding, margins, and gaps throughout

## 🚀 Getting Started

1. **Clone/Download** the project files
2. **Open** `chat-ui/chat.html` in your web browser
3. **Start chatting** - no server required for the UI demo


## 🎯 Key Features Implementation

### Sidebar Behavior
- **Desktop**: 72px compact → 280px on hover
- **Mobile**: Hidden by default → Full overlay on toggle
- **Smooth Transitions**: 250ms easing for all interactions

### Message System
- **Real-time Updates**: Instant message display with timestamps
- **AI Simulation**: Randomized responses with typing indicators
- **History Tracking**: Automatic storage of conversation previews

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant ratios

## 🔧 Customization

### Colors
Edit CSS custom properties in `:root` to change the theme:

```css
:root {
  --primary-color: #your-color;
  --sidebar-bg: #your-sidebar-color;
  /* ... other variables */
}
```

### AI Responses
Modify the `aiResponses` array in `scripts.js` to customize bot replies.

### Sidebar Width
Adjust the sidebar width variables:

```css
.sidebar {
  width: 72px; /* Default width */
}

.sidebar:hover {
  width: 280px; /* Expanded width */
}
```

## 📈 Performance Optimizations

- **CSS Custom Properties**: Efficient theme switching
- **Minimal JavaScript**: Lightweight DOM manipulation
- **Optimized Fonts**: Preloaded Inter font family
- **Efficient Selectors**: Minimal specificity conflicts
- **Smooth Animations**: Hardware-accelerated transitions

## 🐛 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Fallbacks**: Graceful degradation for older browsers

## 📝 Development Notes

- **Modular CSS**: Organized sections with clear comments
- **Clean JavaScript**: Separated concerns and event handling
- **Responsive First**: Mobile-first approach with progressive enhancement
- **Performance Focused**: Optimized for smooth user experience


