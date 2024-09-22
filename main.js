function crearHTML() {
    const body = document.body;

    const formulario = document.createElement("form");
    formulario.innerHTML = `
        <h2>Gestión de Turnos Médicos</h2>
        <label>Nombre del Paciente:</label><br>
        <input type="text" id="nombre"><br><br>
        <label>Especialidad Médica:</label><br>
        <select id="especialidad">
            <option value="">--Seleccionar--</option>
            <option value="Cardiología">Cardiología</option>
            <option value="Pediatría">Pediatría</option>
            <option value="Dermatología">Dermatología</option>
            <option value="Neurología">Neurología</option>
        </select><br><br>
        <label>Fecha del Turno:</label><br>
        <input type="date" id="fecha"><br><br>
        <label>Hora del Turno:</label><br>
        <input type="time" id="hora"><br><br>
        <button type="button" id="crearTurnoBtn">Crear Turno</button><br><br>
    `;

    const listaTurnos = document.createElement("div");
    listaTurnos.id = "listaTurnos";
    
    body.appendChild(formulario);
    body.appendChild(listaTurnos);
}

function crearTurno(nombre, especialidad, fecha, hora) {
    let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
    const nuevoTurno = {
        id: Date.now(),
        nombre: nombre,
        especialidad: especialidad,
        fecha: fecha,
        hora: hora
    };
    turnos.push(nuevoTurno);
    localStorage.setItem('turnos', JSON.stringify(turnos));
    listarTurnos();
    limpiarFormulario();  
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("especialidad").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("hora").value = "";
}

function listarTurnos() {
    let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
    const listaTurnosDiv = document.getElementById("listaTurnos");
    listaTurnosDiv.innerHTML = "<h3>Turnos Médicos:</h3>";
    
    if (turnos.length === 0) {
        listaTurnosDiv.innerHTML += "No hay turnos agendados.";
    } else {
        turnos.forEach(turno => {
            listaTurnosDiv.innerHTML += `
                <p>
                    <strong>Paciente:</strong> ${turno.nombre}<br>
                    <strong>Especialidad:</strong> ${turno.especialidad}<br>
                    <strong>Fecha:</strong> ${turno.fecha}<br>
                    <strong>Hora:</strong> ${turno.hora}<br>
                    <button onclick="eliminarTurno(${turno.id})">Eliminar Turno</button>
                </p>
                <hr>
            `;
        });
    }
}

function eliminarTurno(id) {
    let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
    turnos = turnos.filter(turno => turno.id !== id);
    localStorage.setItem('turnos', JSON.stringify(turnos));
    listarTurnos();
}

function inicializar() {
    crearHTML(); 
    document.getElementById("crearTurnoBtn").addEventListener("click", function() {
        const nombre = document.getElementById("nombre").value;
        const especialidad = document.getElementById("especialidad").value;
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;
        
        if (nombre && especialidad && fecha && hora) {
            crearTurno(nombre, especialidad, fecha, hora); 
        } else {
            alert("Por favor, complete todos los datos.");
        }
    });
    listarTurnos(); 
}

function cambiarColor(color) {
    document.body.style.backgroundColor = color;
}

document.addEventListener("DOMContentLoaded", function() {
    cambiarColor("#f9e79f")
})

document.addEventListener("DOMContentLoaded", inicializar);
