document.getElementById("formularioRegistro").addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuarioNuevo").value;
    const password = document.getElementById("contrasenaNueva").value;
    const confirmar = document.getElementById("contrasenaConfirm").value;

    if (password !== confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find(u => u.usuario === usuario);

    if (existe) {
        alert("Ese usuario ya existe");
        return;
    }

    usuarios.push({
        usuario: usuario,
        password: password
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cuenta creada correctamente");

    window.location.href = "index2.html";
});