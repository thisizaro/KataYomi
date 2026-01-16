// Katakana detection regex
const KATAKANA_REGEX = /[\u30A0-\u30FF]+/g;

// Convert Katakana → Hiragana
function katakanaToHiragana(text) {
  return text.replace(/[\u30A0-\u30FF]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) - 0x60);
  });
}

// Check if node should be skipped
function isSkippable(node) {
  return (
    node.parentNode &&
    ["SCRIPT", "STYLE", "INPUT", "TEXTAREA"].includes(node.parentNode.nodeName)
  );
}

// Walk through text nodes
function walk(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (!node.nodeValue.trim()) return;
    if (isSkippable(node)) return;

    if (KATAKANA_REGEX.test(node.nodeValue)) {
      replaceKatakana(node);
    }
  } else {
    node.childNodes.forEach(walk);
  }
}

// Replace Katakana with spans
function replaceKatakana(textNode) {
  const fragment = document.createDocumentFragment();
  const text = textNode.nodeValue;

  let lastIndex = 0;
  text.replace(KATAKANA_REGEX, (match, index) => {
    // Text before
    fragment.appendChild(document.createTextNode(text.slice(lastIndex, index)));

    // Katakana span
    const span = document.createElement("span");
    span.className = "katayomi-word";
    span.textContent = match;
    span.dataset.reading = katakanaToHiragana(match);

    fragment.appendChild(span);
    lastIndex = index + match.length;
  });

  // Remaining text
  fragment.appendChild(document.createTextNode(text.slice(lastIndex)));

  textNode.parentNode.replaceChild(fragment, textNode);
}

// Tooltip
const tooltip = document.createElement("div");
tooltip.className = "katayomi-tooltip";
document.body.appendChild(tooltip);

document.addEventListener("mouseover", (e) => {
  const target = e.target;
  if (target.classList.contains("katayomi-word")) {
    tooltip.textContent = target.dataset.reading;
    tooltip.style.display = "block";
  }
});

document.addEventListener("mousemove", (e) => {
  tooltip.style.left = e.pageX + 10 + "px";
  tooltip.style.top = e.pageY + 10 + "px";
});

document.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("katayomi-word")) {
    tooltip.style.display = "none";
  }
});

// Run
walk(document.body);
