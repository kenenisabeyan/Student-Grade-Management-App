const nameInput = document.getElementById("nameInput");
const markInput = document.getElementById("markInput");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");

let students = [];

// Calculate grade
function calculateGrade(mark) {
  if (mark >= 80) return "A";
  if (mark >= 60) return "B";
  if (mark >= 50) return "C";
  return "F";
}

// Save to localStorage
function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Load from localStorage
function loadStudents() {
  const saved = localStorage.getItem("students");
  if (saved) {
    students = JSON.parse(saved);
    students.forEach(addStudentToTable);
  }
}

// Add student to table
function addStudentToTable(student) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.mark}</td>
    <td>${student.grade}</td>
  `;

  tableBody.appendChild(row);
}

// Button click
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const mark = Number(markInput.value);

  if (name === "" || mark < 0 || mark > 100) {
    alert("Please enter valid data");
    return;
  }

  const grade = calculateGrade(mark);

  const student = { name, mark, grade };
  students.push(student);
  saveStudents();
  addStudentToTable(student);

  nameInput.value = "";
  markInput.value = "";
});

// Load students on start
loadStudents();
