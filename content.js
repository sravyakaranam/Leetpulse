console.log("✅ LeetCode Streak Tracker: content.js loaded");

// Inject inject.js
function injectScript() {
    console.log("⏳ Waiting for DOM to load before injecting...");

    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("inject.js");
    script.onload = function () {
        console.log("✅ Inject.js successfully injected.");
        this.remove();
    };

    if (document.head) {
        document.head.appendChild(script);
        console.log("✅ Script injection SUCCESS.");
    } else {
        console.warn("⚠️ Document head not found, retrying...");
        setTimeout(injectScript, 100);
    }
}

// Relay messages from inject.js to background.js
window.addEventListener("message", (event) => {
    if (event.source !== window || !event.data || event.data.source !== "leetcode-tracker") return;

    console.log("📩 Message received in content.js from inject.js:", event.data);

    if (chrome.runtime && chrome.runtime.id) {
        chrome.runtime.sendMessage(event.data, (response) => {
            if (chrome.runtime.lastError) {
                console.error("🚨 Error sending message to background.js:", chrome.runtime.lastError);
            } else {
                console.log("📩 Successfully relayed message to background.js!", response);
            }
        });
    } else {
        console.error("🚨 Extension context invalidated! Reloading extension...");
    }
    
});

// Run injection when DOM is ready
if (document.readyState === "complete") {
    injectScript();
} else {
    window.addEventListener("load", injectScript);
}
