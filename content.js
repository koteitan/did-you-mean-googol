// Get the search query from URL
function getSearchQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('q');
}

// Check if the query is exactly "google" (single word, case insensitive)
function isGoogleQuery(query) {
  if (!query) return false;
  const trimmedQuery = query.trim().toLowerCase();
  return trimmedQuery === 'google';
}

// Create and insert the "did you mean: googol" suggestion
function insertDidYouMean() {
  // Check if already inserted
  if (document.getElementById('did-you-mean-googol')) {
    return;
  }

  // Find the search results container
  const searchContainer = document.querySelector('#search') ||
                         document.querySelector('#center_col') ||
                         document.querySelector('#rcnt');

  if (!searchContainer) {
    console.log('Search container not found');
    return;
  }

  // Create the suggestion element
  const suggestionDiv = document.createElement('div');
  suggestionDiv.id = 'did-you-mean-googol';
  suggestionDiv.style.cssText = `
    padding: 16px 0;
    font-family: arial, sans-serif;
    font-size: 16px;
    line-height: 1.58;
  `;

  const suggestionText = document.createElement('span');
  suggestionText.style.cssText = `
    color: #70757a;
  `;
  suggestionText.textContent = 'Did you mean: ';

  const suggestionLink = document.createElement('a');
  suggestionLink.href = '/search?q=googol';
  suggestionLink.style.cssText = `
    color: #1a0dab;
    text-decoration: none;
    cursor: pointer;
  `;
  suggestionLink.textContent = 'googol';

  // Add hover effect
  suggestionLink.addEventListener('mouseenter', () => {
    suggestionLink.style.textDecoration = 'underline';
  });
  suggestionLink.addEventListener('mouseleave', () => {
    suggestionLink.style.textDecoration = 'none';
  });

  suggestionDiv.appendChild(suggestionText);
  suggestionDiv.appendChild(suggestionLink);

  // Insert at the beginning of search results
  const firstChild = searchContainer.firstChild;
  if (firstChild) {
    searchContainer.insertBefore(suggestionDiv, firstChild);
  } else {
    searchContainer.appendChild(suggestionDiv);
  }

  console.log('Did you mean: googol inserted');
}

// Main execution
function main() {
  const query = getSearchQuery();
  console.log('Search query:', query);

  if (isGoogleQuery(query)) {
    console.log('Query is "google", inserting suggestion');
    insertDidYouMean();
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}

// Also watch for dynamic content changes (for SPA-like behavior)
const observer = new MutationObserver((mutations) => {
  const query = getSearchQuery();
  if (isGoogleQuery(query)) {
    insertDidYouMean();
  }
});

// Start observing after a short delay to ensure page is loaded
setTimeout(() => {
  const searchContainer = document.querySelector('#search') ||
                         document.querySelector('#center_col') ||
                         document.querySelector('#rcnt');
  if (searchContainer) {
    observer.observe(searchContainer, {
      childList: true,
      subtree: true
    });
  }
}, 1000);
