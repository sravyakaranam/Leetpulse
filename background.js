console.log("✅ Background script loaded!");


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "submission_successful") {
        console.log("📩 Received successful submission message.");
        
        // Get the current date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0];

        chrome.storage.local.get(["streakCount", "lastSubmissionDate"], (result) => {
            let streakCount = result.streakCount || 0;
            let lastSubmissionDate = result.lastSubmissionDate || null;

            if (lastSubmissionDate === today) {
                console.log("✅ Already counted today's submission. No changes to streak.");
            } else {
                if (lastSubmissionDate) {
                    const lastDate = new Date(lastSubmissionDate);
                    const todayDate = new Date(today);
                    const difference = (todayDate - lastDate) / (1000 * 60 * 60 * 24); // Days difference

                    if (difference === 1) {
                        streakCount += 1;  // Continue streak
                    } else {
                        streakCount = 1; // Reset streak if more than 1 day has passed
                    }
                } else {
                    streakCount = 1; // First submission
                }

                chrome.storage.local.set({ streakCount, lastSubmissionDate: today }, () => {
                    console.log(`🔥 Streak updated: ${streakCount} days.`);
                });
            }
        });
    }
});

