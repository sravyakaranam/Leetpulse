// popup.js
document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.sync.get(["streakCount", "dailyQuote"], function(data) {
        const streakElem = document.getElementById("streak");
        const quoteElem = document.getElementById("quote");

        if (streakElem) streakElem.innerText = data.streakCount || 0;
        if (quoteElem) quoteElem.innerText = data.dailyQuote || "Solve one to get hyped 😎";
    });
});
