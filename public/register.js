document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const imageFile = document.getElementById("image").files[0];

  if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }

  const reader = new FileReader();

  reader.onload = async () => {
    // Save image to backend and localStorage
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        image: reader.result || null // Base64 image
      })
    });

    const data = await res.json();

    if (res.ok) {
      // Save image and token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userImage", data.user.image || "");
      alert("Registered successfully!");
      window.location.href = "students.html"; // redirect to dashboard
    } else {
      alert(data.message);
    }
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile); // convert to Base64
  } else {
    reader.onload(); // if no image, send null
  }
});
