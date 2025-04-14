function showTab(id) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });
  const selected = document.getElementById(id);
  selected.classList.add("active");
}

const exams = [
  { name: "114 統測", date: "2025-04-26" },
  { name: "114 會考", date: "2025-05-17" },
  { name: "114 分科", date: "2025-07-11" },
  { name: "115 學測", date: "2026-01-16" }
];

const holidays = [
  { name: "勞動節", date: "2025-05-01" },
  { name: "端午節", date: "2025-05-31" },
  { name: "中秋節", date: "2025-10-06" },
  { name: "教師節", date: "2025-09-28" },
  { name: "農曆新年", date: "2026-02-17" }
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

function renderList(data, elementId) {
  const list = document.getElementById(elementId);
  list.innerHTML = "";
  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name}：${daysUntil(item.date)}（${formatDate(item.date)}）`;
    list.appendChild(li);
  });
}

function calculateCustom() {
  const title = document.getElementById("customTitle").value;
  const date = document.getElementById("customDate").value;
  const result = document.getElementById("customResult");
  if (title && date) {
    result.textContent = `${title}：${daysUntil(date)}（${formatDate(date)}）`;
  } else {
    result.textContent = "請輸入完整資料";
  }
}

renderList(exams, "examList");
renderList(holidays, "holidayList");