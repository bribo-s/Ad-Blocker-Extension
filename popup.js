async function updatePopupStatus() {
  const statusNode = document.getElementById("pageStatus");
  if (!statusNode) {
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.url) {
    statusNode.textContent = "Unavailable on this page";
    return;
  }

  const isBrowserPage = tab.url.startsWith("chrome://") || tab.url.startsWith("edge://");
  statusNode.textContent = isBrowserPage ? "Chrome pages are excluded" : "Monitoring page elements";
}

updatePopupStatus().catch(() => {
  const statusNode = document.getElementById("pageStatus");
  if (statusNode) {
    statusNode.textContent = "Ready";
  }
});
