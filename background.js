chrome.runtime.onStartup.addListener(() => {
    console.log("🚀 Background script restarted on startup");
});

chrome.runtime.onInstalled.addListener(() => {
    console.log("🛠 Background script installed or updated");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "submission_successful") {
        console.log("📩 Received successful submission message.");
        
        // Ensure we store the streak properly
        const today = new Date().toISOString().split("T")[0];

        chrome.storage.local.get(["streakCount", "lastSubmissionDate"], (result) => {
            let streakCount = result.streakCount || 0;
            let lastSubmissionDate = result.lastSubmissionDate || null;

            if (lastSubmissionDate === today) {
                console.log("✅ Already counted today's submission.");
                sendResponse({ status: "no_change" });
            } else {
                if (lastSubmissionDate) {
                    const lastDate = new Date(lastSubmissionDate);
                    const todayDate = new Date(today);
                    const difference = (todayDate - lastDate) / (1000 * 60 * 60 * 24);
                    streakCount = (difference === 1) ? streakCount + 1 : 1;
                } else {
                    streakCount = 1;
                }

                chrome.storage.local.set({ streakCount, lastSubmissionDate: today }, () => {
                    console.log(`🔥 Streak updated: ${streakCount} days.`);
                    sendResponse({ status: "success", streak: streakCount });
                });
            }
        });

        return true; // Keeps sendResponse alive
    }
});
