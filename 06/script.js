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
  { name: "元旦", date: "2026-01-01" },
  { name: "春節除夕", date: "2026-02-16" },
  { name: "春節初一", date: "2026-02-17" },
  { name: "和平紀念日", date: "2026-02-28" },
  { name: "清明節", date: "2026-04-04" },
  { name: "兒童節", date: "2026-04-04" },
  { name: "勞動節", date: "2026-05-01" },
  { name: "端午節", date: "2026-06-19" },
  { name: "中秋節", date: "2026-09-24" },
  { name: "國慶日", date: "2026-10-10" }
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

function renderList(data, elementId, storageKey) {
  const list = document.getElementById(elementId);
  const currentHighlight = localStorage.getItem(storageKey);
  list.innerHTML = "";
  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name}：${daysUntil(item.date)}（${formatDate(item.date)}）`;

    if (item.name === currentHighlight) {
      li.classList.add("highlight-exam");
    }

    li.onclick = () => {
      localStorage.setItem(storageKey, item.name);
      renderList(data, elementId, storageKey);
    };

    list.appendChild(li);
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

renderList(exams, "examList", "highlightExam");
renderList(holidays, "holidayList", "highlightHoliday");

window.addEventListener("load", () => {
  const prompt = document.getElementById("pwaPrompt");
  if (window.matchMedia('(display-mode: browser)').matches) {
    prompt.textContent = "📲 小提示：你可以將此工具加入主畫面，像 App 一樣使用！";
  }
});