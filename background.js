// background.js
chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.url.includes("submissions/detail/") && details.statusCode === 200) {
            updateStreak();
        }
    },
    { urls: ["*://leetcode.com/*"] }
);

// Encapsulated function to avoid breaking existing logic
function getRandomQuote() {
    const motivationalQuotes = [
        "Discipline beats motivation. Show up daily. 🧱",
        "You’re not always gonna feel like it — do it anyway.",
        "One step at a time. Today > yesterday.",
        "Consistency builds legends. Not magic.",
        "Each solved problem is proof you're growing.",
        "Grit > talent. You’re building mental strength.",
        "You're doing hard things — that’s how growth feels.",
        "This streak? It’s who you are becoming.",
        "Earn your future one line of code at a time.",
        "Greatness is built in silence. Keep going."
    ];
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}

function updateStreak() {
    const today = new Date().toISOString().split("T")[0];

    chrome.storage.sync.get(["lastSubmissionDate", "streakCount"], (data) => {
        const lastSubmissionDate = data.lastSubmissionDate;
        let streakCount = data.streakCount || 0;

        if (lastSubmissionDate === today) {
            console.log("Already submitted today. No update needed.");
            return;  // prevent multiple submissions per day counting extra
        }

        const yesterday = new Date();
        yesterday.setUTCDate(yesterday.getUTCDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        if (lastSubmissionDate === yesterdayStr) {
            streakCount += 1;
        } else {
            streakCount = 1;  // reset streak
        }

        const newQuote = getRandomQuote();

        chrome.storage.sync.set({
            lastSubmissionDate: today,
            streakCount: streakCount,
            dailyQuote: newQuote
        }, () => {
            console.log("✅ Streak updated:", streakCount);
            console.log("✅ Today's quote:", newQuote);
        });
    });
}
