// Background script to handle message passing

// Dictionary of words to replace
const replacements = {
  'up': 'down',
  'left': 'right',
  // Add more replacements as needed
};

// Function to replace words using a dictionary
function replaceWordsUsingDictionary(text) {
  for (const word in replacements) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    text = text.replace(regex, replacements[word]);
  }
  return text;
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "replaceWords") {
    // Replace words using the dictionary and send the modified text back to the content script
    const modifiedText = replaceWordsUsingDictionary(message.text);
    sendResponse({ modifiedText });
  }
});