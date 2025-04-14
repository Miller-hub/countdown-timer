function showTab(id) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("active-tab"));
  document.getElementById("tab-" + id).classList.add("active-tab");
}

const exams = [
  { name: "114 統測", date: "2025-04-26" },
  { name: "114 會考", date: "2025-05-17" },
  { name: "114 分科", date: "2025-07-11" },
  { name: "115 學測", date: "2026-01-16" }
];

const holidays = [
  { name: "元旦", month: 1, day: 1 },
  { name: "春節除夕", month: 2, day: 16 },
  { name: "春節初一", month: 2, day: 17 },
  { name: "和平紀念日", month: 2, day: 28 },
  { name: "清明節", month: 4, day: 4 },
  { name: "兒童節", month: 4, day: 4 },
  { name: "勞動節", month: 5, day: 1 },
  { name: "端午節", month: 6, day: 19 },
  { name: "中秋節", month: 9, day: 24 },
  { name: "國慶日", month: 10, day: 10 }
];

function daysUntil(dateStr) {
  const today = new Date();
  const target = new Date(dateStr);
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  return diff >= 0 ? `還有 ${diff} 天` : `已過 ${Math.abs(diff)} 天`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

function renderListWithHint(data, elementId, storageKey, hintId) {
  const list = document.getElementById(elementId);
  const currentHighlight = localStorage.getItem(storageKey);
  list.innerHTML = "";

  data.forEach(item => {
    const li = document.createElement("li");

    const today = new Date();
    const targetDate = item.date
      ? new Date(item.date)
      : (() => {
          let thisYear = new Date().getFullYear();
          let eventDate = new Date(thisYear, item.month - 1, item.day);
          if (eventDate < today.setHours(0, 0, 0, 0)) {
            eventDate = new Date(thisYear + 1, item.month - 1, item.day);
          }
          return eventDate;
        })();

    li.textContent = `${item.name}：${daysUntil(targetDate)}（${formatDate(targetDate)}）`;

    if (item.name === currentHighlight) {
      li.classList.add("highlight-exam");
    }

    li.onclick = () => {
      localStorage.setItem(storageKey, item.name);
      renderListWithHint(data, elementId, storageKey, hintId);
    };

    list.appendChild(li);
    if (hintId) document.getElementById(hintId).textContent = "已選擇：" + item.name;
  });
}

function calculateCustom() {
  const date = document.getElementById("customDate").value;
  const result = document.getElementById("customResult");
  if (date) {
    result.textContent = `${daysUntil(date)}（${formatDate(date)}）`;
  } else {
    result.textContent = "請輸入日期";
  }
}

// 顯示今日日期
document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const formatted = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
  document.getElementById("todayInfo-exam").textContent = formatted;
  document.getElementById("todayInfo-holiday").textContent = formatted;
  document.getElementById("todayInfo-custom").textContent = `今天是：${formatted}`;
});

renderListWithHint(exams, "examList", "highlightExam", "examHint");
renderListWithHint(holidays, "holidayList", "highlightHoliday", "holidayHint");

window.addEventListener("load", () => {
  const prompt = document.getElementById("pwaPrompt");
  if (window.matchMedia('(display-mode: browser)').matches) {
    prompt.textContent = "📲 小提示：你可以將此工具加入主畫面，像 App 一樣使用！";
  }
});