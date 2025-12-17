function login() {
  if (user.value === "admin" && pass.value === "1234") {
    location.href = "dashboard.html";
  } else {
    alert("Erreur");
  }
}
