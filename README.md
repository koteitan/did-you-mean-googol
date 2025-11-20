# did-you-mean-googol
Chrome extension that shows "did you mean: googol" when you search google

## Description
This extension adds a humorous "Did you mean: googol" suggestion when you search for "google" on Google Search. It's a playful reference to the fact that "Google" was named after "googol" (the number 10^100).

## Installation

### Install from source
1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the `did-you-mean-googol` directory

## Usage
1. Go to Google Search (https://www.google.com)
2. Search for the word "google" (just the single word)
3. You will see "Did you mean: googol" displayed at the top of the search results

## Files
- `manifest.json` - Extension configuration file
- `content.js` - Content script that inserts the suggestion
- `sample.html` - Sample Google search result page for reference

## Note
This extension only activates when you search for exactly "google" (single word, case-insensitive).
