document.addEventListener("mousemove", (e) => {
    const container = document.getElementById('container');
    let x = (window.innerWidth / 2 - e.pageX) / 25;
    let y = (window.innerHeight / 2 - e.pageY) / 25;
    container.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user === "admin" && pass === "1234") {
        window.location.href = "dashboard.html";
    } else {
        alert("❌ Identifiants incorrects !");
    }
});
