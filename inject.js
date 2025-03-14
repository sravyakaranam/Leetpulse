// console.log("✅ Injected script running in LeetCode's page context");

// // Function to send message safely to content.js
// function sendMessageToContentScript(action, data = {}) {
//     window.postMessage({ action, ...data, source: "leetcode-tracker" }, "*");
// }

// // Hook into fetch()
// const originalFetch = window.fetch;
// window.fetch = async function (...args) {
//     console.log(`📡 Fetch Request detected:`, args);

//     const response = await originalFetch(...args);
//     const clonedResponse = response.clone();

//     clonedResponse.text().then(text => {
//         console.log(`📑 Response from: ${args[0]}`, text.slice(0, 200));

//         try {
//             if (text.trim().startsWith("{") || text.trim().startsWith("[")) {
//                 const data = JSON.parse(text);
//                 console.log("🧐 Parsed JSON Response:", data);

//                 if (args[0].includes("/submissions/detail/") && args[0].includes("/check/")) {
//                     console.log("🔍 Checking submission response...");
//                     if (data?.state === "SUCCESS" && data?.status_code === 10 && data?.run_success) {
//                         console.log("🎉 SUCCESS: LeetCode submission was accepted!");

//                         sendMessageToContentScript("submission_successful", {
//                             submissionId: data.submission_id,
//                             runtime: data.status_runtime,
//                             memory: data.status_memory
//                         });
//                     } else {
//                         console.log("⏳ Submission is still pending...");
//                     }
//                 }
//             } else {
//                 console.warn(`⚠️ Non-JSON Response from: ${args[0]}`);
//             }
//         } catch (err) {
//             console.error("❌ JSON Parsing Error for:", args[0], err);
//         }
//     }).catch(err => {
//         console.warn(`⚠️ Error reading response from: ${args[0]}`);
//     });

//     return response;
// };

// console.log("✅ Now monitoring all network requests through fetch() and XHR");


console.log("✅ Injected script running in LeetCode's page context");

// Function to send message safely to content.js
function sendMessageToContentScript(action, data = {}) {
    window.postMessage({ action, ...data, source: "leetcode-tracker" }, "*");
}

// Hook into fetch()
const originalFetch = window.fetch;
window.fetch = async function (...args) {
    console.log(`📡 Fetch Request detected:`, args);

    const response = await originalFetch(...args);
    const clonedResponse = response.clone();

    clonedResponse.text().then(text => {
        console.log(`📑 Response from: ${args[0]}`, text.slice(0, 200));

        try {
            if (text.trim().startsWith("{") || text.trim().startsWith("[")) {
                const data = JSON.parse(text);
                console.log("🧐 Parsed JSON Response:", data);

                if (args[0].includes("/submissions/detail/") && args[0].includes("/check/")) {
                    console.log("🔍 Checking submission response...");
                    if (data?.state === "SUCCESS" && data?.status_code === 10 && data?.run_success) {
                        console.log("🎉 SUCCESS: LeetCode submission was accepted!");

                        sendMessageToContentScript("submission_successful", {
                            submissionId: data.submission_id,
                            runtime: data.status_runtime,
                            memory: data.status_memory
                        });
                    } else {
                        console.log("⏳ Submission is still pending...");
                    }
                }
            } else {
                // Ignore non-JSON responses to prevent errors
                console.log(`⚠️ Ignoring Non-JSON Response from: ${args[0]}`);
            }
        } catch (err) {
            console.error("❌ JSON Parsing Error for:", args[0], err);
        }
    }).catch(err => {
        console.warn(`⚠️ Error reading response from: ${args[0]}`);
    });

    return response;
};

console.log("✅ Now monitoring all network requests through fetch() and XHR");
