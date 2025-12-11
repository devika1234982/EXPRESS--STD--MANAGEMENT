const apiBase = "/api/stdlist";

const form = document.getElementById("stdForm");

async function fetchStudents() {
  const res = await fetch(apiBase);
  const list = await res.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";

  list.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.name}</td>
      <td>${s.email}</td>
      <td>${s.rollNumber}</td>
      <td>${s.marks.subject1}, ${s.marks.subject2}, ${s.marks.subject3}</td>
      <td>
        <button class="edit" data-id="${s._id}">Edit</button>
        <button class="del" data-id="${s._id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });


  document.querySelectorAll(".edit").forEach(btn => {
    btn.onclick = () => editStudent(btn.dataset.id);
  });

  document.querySelectorAll(".del").forEach(btn => {
    btn.onclick = () => deleteStudent(btn.dataset.id);
  });
}

async function submitForm(e) {
  e.preventDefault();

  const id = document.getElementById("studentId").value;

  const payload = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    rollNumber: document.getElementById("rollNumber").value,
    marks: {
      subject1: Number(document.getElementById("subject1").value),
      subject2: Number(document.getElementById("subject2").value),
      subject3: Number(document.getElementById("subject3").value)
    }
  };

  if (id) {
   
    const res = await fetch(`${apiBase}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) alert("Update failed");

  } else {

    const res = await fetch(apiBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) alert("Create failed");
  }

  clearForm();
  fetchStudents();
}

function clearForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("rollNumber").value = "";
  document.getElementById("subject1").value = "";
  document.getElementById("subject2").value = "";
  document.getElementById("subject3").value = "";
}


async function editStudent(id) {
  const res = await fetch(`${apiBase}/${id}`);
  const student = await res.json();

  document.getElementById("name").value = student.name;
  document.getElementById("email").value = student.email;
  document.getElementById("rollNumber").value = student.rollNumber;

  document.getElementById("subject1").value = student.marks.subject1;
  document.getElementById("subject2").value = student.marks.subject2;
  document.getElementById("subject3").value = student.marks.subject3;

  document.getElementById("studentId").value = student._id;
}


async function deleteStudent(id) {
  if (confirm("Are you sure you want to delete this student?")) {
    await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    fetchStudents();
  }
}


form.addEventListener("submit", submitForm);
document.getElementById("clearBtn").addEventListener("click", clearForm);


fetchStudents();

