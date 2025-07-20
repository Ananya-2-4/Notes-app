import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zrilerrrudnmykrwmuhy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // use full key
const supabase = createClient(supabaseUrl, supabaseKey);

// Example: Add a name to a table called "names"
async function addName(name) {
  const { data, error } = await supabase.from("names").insert([{ name }]);
  if (error) console.error("Error adding name:", error);
  else console.log("Name added:", data);
}
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const todayReminder = document.getElementById("todayReminder");

let facts = [
  "Sharks existed before trees 🌊🌳",
  "Bananas are radioactive 🍌🔍",
  "Octopuses have three hearts 💖💖💖",
  "You can't hum while holding your nose 🤔",
  "Sloths can hold their breath longer than dolphins 😴🌊",
];

function displayFact() {
  const factElement = document.getElementById("fact");
  let fact = facts[Math.floor(Math.random() * facts.length)];
  factElement.innerText = `💡 ${fact}`;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => saveTasks());
  
  const span = document.createElement("span");
  span.innerText = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    const text = li.querySelector("span").innerText;
    const checked = li.querySelector("input").checked;
    tasks.push({ text, checked });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach((task) => {
    taskInput.value = task.text;
    addTask();
    const lastTask = taskList.lastChild;
    lastTask.querySelector("input").checked = task.checked;
  });
  taskInput.value = "";
}

function setReminder() {
  const reminderText = document.getElementById("reminderInput").value;
  localStorage.setItem("dailyReminder", reminderText);
  todayReminder.innerText = reminderText;
}

function loadReminder() {
  const saved = localStorage.getItem("dailyReminder");
  if (saved) todayReminder.innerText = saved;
}

// Run on load
loadTasks();
loadReminder();
displayFact();
