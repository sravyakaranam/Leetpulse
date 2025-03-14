document.addEventListener("DOMContentLoaded", function () {
    const statusMessage = document.getElementById("status-message");
    const streakCount = document.getElementById("streak-count");
    const resetBtn = document.getElementById("reset-btn");

    // Load streak count from storage
    chrome.storage.local.get(["streakCount"], (result) => {
        let count = result.streakCount || 0;
        streakCount.textContent = count;
        statusMessage.textContent = "🎉 Keep your streak alive!";
    });

    // Reset streak count
    resetBtn.addEventListener("click", () => {
        chrome.storage.local.set({ streakCount: 0, lastSubmissionDate: null }, () => {
            streakCount.textContent = "0";
            statusMessage.textContent = "💔 Streak reset!";
        });
    });
});
