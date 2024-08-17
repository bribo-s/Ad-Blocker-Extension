chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      return { cancel: true };
    },
    { urls: ["*://*.doubleclick.net/*", "*://*.googlesyndication.com/*", "*://*.adsafeprotected.com/*", "*://*.adnxs.com/*"] },
    ["blocking"]
  );
  
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
      "id": 1,
      "priority": 1,
      "action": {
        "type": "block"
      },
      "condition": {
        "urlFilter": "||example.com",
        "resourceTypes": ["script"]
      }
    }],
    removeRuleIds: []
  }, function() {
    console.log("Dynamic rule added");
  });
  
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
      "id": 100,
      "priority": 1,
      "action": {
        "type": "block"
      },
      "condition": {
        "urlFilter": "||annoyingads.com",
        "resourceTypes": ["image", "script"]
      }
    }],
    removeRuleIds: []
  }, function() {
    console.log("Dynamic ad blocking rules updated");
  });
  