// Background script to communicate with content script

// Dictionary of words to replace
const replacements = {
  'up': 'down',
  'left': 'right',
  // Add more replacements as needed
};

// Function to replace words using a dictionary
function replaceWordsUsingDictionary() {
  const allTextNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

  let node;
  while ((node = allTextNodes.nextNode())) {
    let text = node.nodeValue;
    for (const word in replacements) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      text = text.replace(regex, replacements[word]);
    }
    node.nodeValue = text;
  }
}

// Send a message to the content script to initiate text replacement
chrome.scripting.executeScript({
  target: { tabId: tab.id },
  function: replaceWordsUsingDictionary
});