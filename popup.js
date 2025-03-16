document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.sync.get("streakCount", function(data) {
        document.getElementById("streak").innerText = data.streakCount || 0;
    });

    chrome.storage.sync.get("lastSubmissionDate", function(data) {
        console.log("Last Submission Date:", data.lastSubmissionDate);
    });
});
