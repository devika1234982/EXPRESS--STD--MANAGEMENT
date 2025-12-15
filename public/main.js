const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

const form = document.getElementById("studentForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("studentId").value;
  const studentData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    rollNumber: document.getElementById("rollNumber").value,
    subject1: document.getElementById("subject1").value,
    subject2: document.getElementById("subject2").value,
    subject3: document.getElementById("subject3").value,
  };

  const url = id ? `/api/students/${id}` : "/api/students";
  const method = id ? "PUT" : "POST";

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify(studentData)
  });

  form.reset();
  fetchStudents();
});

async function fetchStudents() {
  const res = await fetch("/api/students", { headers: { Authorization: `Bearer ${token}` } });
  const students = await res.json();
  const tbody = document.getElementById("studentsTable");
  tbody.innerHTML = "";
  students.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.name}</td>
      <td>${s.email}</td>
      <td>${s.rollNumber}</td>
      <td>${s.subject1}, ${s.subject2}, ${s.subject3}</td>
      <td>
        <button onclick="editStudent('${s._id}')">Edit</button>
        <button onclick="deleteStudent('${s._id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.editStudent = async (id) => {
  const res = await fetch(`/api/students/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  const s = await res.json();
  document.getElementById("studentId").value = s._id;
  document.getElementById("name").value = s.name;
  document.getElementById("email").value = s.email;
  document.getElementById("rollNumber").value = s.rollNumber;
  document.getElementById("subject1").value = s.subject1;
  document.getElementById("subject2").value = s.subject2;
  document.getElementById("subject3").value = s.subject3;
};

window.deleteStudent = async (id) => {
  await fetch(`/api/students/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  fetchStudents();
};


fetchStudents();