const DYNAMIC_RULES = [
  {
    id: 1001,
    priority: 2,
    action: { type: "block" },
    condition: {
      urlFilter: "||annoyingads.com",
      resourceTypes: ["image", "script", "sub_frame"],
    },
  },
  {
    id: 1002,
    priority: 2,
    action: { type: "block" },
    condition: {
      urlFilter: "||popads.net",
      resourceTypes: ["image", "script", "sub_frame"],
    },
  },
  {
    id: 1003,
    priority: 2,
    action: { type: "block" },
    condition: {
      urlFilter: "||outbrain.com",
      resourceTypes: ["image", "script", "xmlhttprequest", "sub_frame"],
    },
  },
];

async function syncDynamicRules() {
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
  const existingRuleIds = existingRules.map((rule) => rule.id);

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: existingRuleIds,
    addRules: DYNAMIC_RULES,
  });
}

async function updateBadge(tabId) {
  if (typeof tabId !== "number") {
    return;
  }

  await chrome.action.setBadgeText({ tabId, text: "ON" });
  await chrome.action.setBadgeBackgroundColor({ tabId, color: "#1f7a4f" });
}

chrome.runtime.onInstalled.addListener(async () => {
  await syncDynamicRules();
});

chrome.runtime.onStartup.addListener(async () => {
  await syncDynamicRules();
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  await updateBadge(tabId);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    await updateBadge(tabId);
  }
});
