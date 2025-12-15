const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "students.html";
  } else alert(data.message);
});