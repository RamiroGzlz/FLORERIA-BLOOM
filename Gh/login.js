document.getElementById("formularioLogin").addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const encontrado = usuarios.find(
        u => u.usuario === usuario && u.password === contrasena
    );

    if (encontrado) {
        alert("Bienvenido " + usuario);
        window.location.href = "https://www.youtube.com/watch?v=EyrflENzpww";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});