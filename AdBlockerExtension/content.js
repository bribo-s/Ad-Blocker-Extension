const blockedSelectors = [
  'iframe[src*="doubleclick"]',
  'iframe[src*="googlesyndication"]',
  'iframe[src*="adservice"]',
  '[id*="ad-slot"]',
  '[class*="ad-slot"]',
  '[id^="google_ads"]',
  '[class*="banner-ad"]',
  '[class*="advert"]',
  '[data-ad]',
  '[data-ad-container]',
  '[data-testid="placementTracking"]',
  '[aria-label*="Sponsored"]',
];

const overlayKeywords = ["ad", "ads", "advert", "sponsor", "promo", "popup"];
let hiddenCount = 0;

function markHidden(element) {
  if (!element || element.dataset.adBlockerHidden === "true") {
    return;
  }

  element.dataset.adBlockerHidden = "true";
  element.style.setProperty("display", "none", "important");
  hiddenCount += 1;
}

function shouldHideOverlay(element) {
  if (!(element instanceof HTMLElement)) {
    return false;
  }

  const style = window.getComputedStyle(element);
  if (style.position !== "fixed" && style.position !== "sticky") {
    return false;
  }

  const text = `${element.id} ${element.className} ${element.getAttribute("aria-label") || ""}`.toLowerCase();
  const hasKeyword = overlayKeywords.some((keyword) => text.includes(keyword));
  const largeOverlay = element.offsetHeight > 120 || element.offsetWidth > 280;

  return hasKeyword && largeOverlay;
}

function hideKnownAds(root = document) {
  blockedSelectors.forEach((selector) => {
    root.querySelectorAll(selector).forEach(markHidden);
  });

  root.querySelectorAll("div, aside, section").forEach((element) => {
    if (shouldHideOverlay(element)) {
      markHidden(element);
    }
  });
}

function injectBaitNode() {
  if (!document.body) {
    return;
  }

  const bait = document.createElement("div");
  bait.className = "adsbox ad-banner sponsored";
  bait.style.position = "absolute";
  bait.style.left = "-9999px";
  bait.setAttribute("aria-hidden", "true");
  document.body.appendChild(bait);

  window.setTimeout(() => {
    if (bait.isConnected) {
      bait.remove();
    }
  }, 1500);
}

function boot() {
  hideKnownAds();
  injectBaitNode();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          hideKnownAds(node);
          if (shouldHideOverlay(node)) {
            markHidden(node);
          }
        }
      });
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  window.setInterval(() => {
    hideKnownAds();
  }, 3000);

  console.info(`Ad Blocker active. Hidden elements: ${hiddenCount}`);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
