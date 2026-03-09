const STORAGE_KEY = "svadjalica-last-date";
const DEFAULT_DATE = "2026-03-04";

const lastDateValue = document.getElementById("lastDateValue");
const daysValue = document.getElementById("daysValue");
const todayButton = document.getElementById("todayButton");

function padNumber(value) {
  return String(value).padStart(2, "0");
}

function formatDisplayDate(date) {
  return `${padNumber(date.getDate())}.${padNumber(date.getMonth() + 1)}.${date.getFullYear()}`;
}

function parseStoredDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(`${DEFAULT_DATE}T00:00:00`);
  }

  return new Date(`${value}T00:00:00`);
}

function getTodayAtMidnight() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function calculateDayDifference(fromDate, toDate) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.floor((toDate - fromDate) / millisecondsPerDay));
}

function getSavedDate() {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_DATE;
}

function render() {
  const storedDate = getSavedDate();
  const savedDate = parseStoredDate(storedDate);
  const today = getTodayAtMidnight();

  lastDateValue.textContent = formatDisplayDate(savedDate);
  daysValue.textContent = String(calculateDayDifference(savedDate, today));
}

todayButton.addEventListener("click", () => {
  const today = getTodayAtMidnight();
  const isoDate = `${today.getFullYear()}-${padNumber(today.getMonth() + 1)}-${padNumber(today.getDate())}`;

  localStorage.setItem(STORAGE_KEY, isoDate);
  render();
});

if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, DEFAULT_DATE);
}

render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // App works without offline caching if registration fails.
    });
  });
}
