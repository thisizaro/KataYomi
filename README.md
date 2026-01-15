# KataYomi — Katakana Hover Reader (MVP)

> A lightweight Chrome extension that helps Japanese learners read **Katakana-heavy text** by showing **Hiragana readings on hover**.

KataYomi is designed as a **minimal, fast MVP** to reduce friction when reading Japanese webpages containing foreign loanwords written in Katakana.

---

## ✨ Features (MVP Scope)

- 🔍 **Automatic Katakana Detection**
  Scans visible webpage text and detects Katakana characters using Unicode ranges.

- 🈶 **Katakana → Hiragana Conversion**
  Converts detected Katakana into their Hiragana equivalents using Unicode offset mapping.

- 🖱️ **Hover-to-Read Overlay**
  Hovering over Katakana text shows a small tooltip with the Hiragana reading.

- ⚡ **Client-side & Lightweight**
  No backend, no API calls, no tracking.

---

## 🚫 Non-Goals (For MVP)

The following are **explicitly out of scope** for the MVP:

- ❌ Meaning / dictionary lookup
- ❌ Advanced morphological analysis
- ❌ Full support for highly dynamic SPAs (Twitter, Instagram, etc.)
- ❌ UI theming or customization
- ❌ Production-level performance optimization

These may be considered in future versions.

---

## 🧠 How It Works (Technical Overview)

### 1. Content Script Injection

The extension injects a content script into webpages using **Chrome Extension Manifest V3**.

### 2. Text Node Traversal

- Walks through DOM text nodes
- Ignores non-readable elements such as:

  - `<script>`
  - `<style>`
  - `<input>`
  - `<textarea>`

### 3. Katakana Detection

Katakana characters are detected using the Unicode range:

```
U+30A0 — U+30FF
```

Regex used:

```
/[\u30A0-\u30FF]+/g
```

### 4. Hiragana Conversion

Katakana is converted to Hiragana by subtracting a fixed Unicode offset:

```
Hiragana = Katakana charCode - 0x60
```

This works reliably for standard Katakana characters.

### 5. Hover Overlay

- Katakana words are wrapped in `<span>` elements
- Mouse hover events trigger a floating tooltip
- Tooltip displays the Hiragana reading

---

## 🧩 Project Structure

```
katayomi/
├── manifest.json
├── content.js
├── styles.css
├── icons/
│   └── icon.png
└── README.md
```

---

## 🛠️ Installation (Development Mode)

1. Clone or download this repository
2. Open Chrome and go to:

   ```
   chrome://extensions
   ```

3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the project folder
6. Visit a Japanese webpage containing Katakana

---

## 🎯 Target Users

- Japanese language learners (JLPT N5–N3)
- Readers struggling with Katakana-heavy technical or news content
- Learners who want **quick reading assistance** without breaking reading flow

---

## 📚 Motivation

Katakana often represents foreign loanwords that learners already know **conceptually**, but struggle to read fluently.

KataYomi aims to:

- Reduce cognitive load
- Improve reading speed
- Build Katakana familiarity through repeated exposure

---

## 🚀 Future Enhancements

Planned improvements (post-MVP):

- 📖 Dictionary / meaning lookup (JMdict or API)
- 🔘 Toggle on/off button
- 🧠 Smarter tokenization for compound words
- 🌐 Support for dynamically loaded content (MutationObserver)
- 🎨 Improved UI and accessibility

---

## ⚠️ Known Limitations

- Conversion assumes **standard Katakana only**
- No context-aware disambiguation
- Tooltip UI is minimal by design

---

## 📄 License

MIT License

---

## 🙌 Acknowledgements

- Unicode Consortium (Japanese character standards)
- Japanese learning community and open linguistic resources

---

**Status:** MVP / Proof of Concept
**Maintainer:** Aranya Dutta
