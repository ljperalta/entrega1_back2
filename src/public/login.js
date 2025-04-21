document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;
  
    const url = `http://localhost:8080/login?user=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}`;
    console.log(url);
    try {
      const response = await fetch(url);
      const data = await response.json();

      const msg = document.getElementById("responseMsg");
      if (data.ok) {
        msg.textContent = data.message;
        msg.style.color = "green";
        // Por ejemplo, redirigir:
        // window.location.href = "/home";
      } else {
        msg.textContent = data.message;
        msg.style.color = "red";
      }

    } catch (error) {
      console.error("Error en la petición:", error);
      document.getElementById("responseMsg").textContent = "Error de conexión con el servidor.";
    }
  });  