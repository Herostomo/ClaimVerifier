// content_script.js
// Listens for GET_CLAIM message and returns selection or page snippet
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === 'GET_CLAIM') {
    try {
      let selection = window.getSelection().toString().trim();
      if (selection && selection.length >= 8) {
        sendResponse({ claim: selection });
        return true;
      }
      // fallback: meta description
      let meta = document.querySelector('meta[name="description"]');
      let desc = meta ? meta.content : null;
      if (!desc) {
        // try first paragraph > 80 chars
        const p = Array.from(document.querySelectorAll('p')).find(x => x.innerText && x.innerText.length > 80);
        desc = p ? p.innerText.slice(0, 800) : (document.body.innerText || '').slice(0, 800);
      }
      sendResponse({ claim: desc || '' });
    } catch (e) {
      sendResponse({ claim: '' });
    }
  }
  return true; // will respond asynchronously
});
