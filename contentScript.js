// Content script to replace words in text nodes using a dictionary

const replacements = {
  'up': 'down',
  'left': 'right',
  // Add more replacements as needed
};

function replaceTextInNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.nodeValue;
    for (const word in replacements) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      text = text.replace(regex, replacements[word]);
    }
    node.nodeValue = text;
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    for (const childNode of node.childNodes) {
      replaceTextInNode(childNode);
    }
  }
}

// Start replacing words from the root of the DOM tree
replaceTextInNode(document.body);