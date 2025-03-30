// quoteSelector.js
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

export function getRandomQuote() {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}
