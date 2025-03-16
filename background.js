chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.url.includes("submissions/detail/") && details.statusCode === 200) {
            updateStreak();
        }
    },
    { urls: ["*://leetcode.com/*"] }
);

function updateStreak() {
    let today = new Date().toISOString().split("T")[0]; // Get today's date in UTC

    chrome.storage.sync.get(["lastSubmissionDate", "streakCount"], function(data) {
        let lastSubmissionDate = data.lastSubmissionDate || null;
        let streakCount = data.streakCount !== undefined ? data.streakCount : 0;

        if (lastSubmissionDate === today) {
            console.log("Already submitted today. Streak unchanged.");
            return;
        }

        if (!lastSubmissionDate) {
            // First submission ever
            streakCount = 1;
        } else {
            let yesterday = new Date();
            yesterday.setUTCDate(yesterday.getUTCDate() - 1);
            let yesterdayStr = yesterday.toISOString().split("T")[0];

            if (lastSubmissionDate === yesterdayStr) {
                streakCount += 1;
            } else {
                streakCount = 1; // Reset if a day is missed
            }
        }

        chrome.storage.sync.set({ lastSubmissionDate: today, streakCount: streakCount }, function() {
            console.log("Updated streak:", streakCount);
        });
    });
}
