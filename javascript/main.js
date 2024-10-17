 function crearHTML() {
     const body = document.body;

    const formulario = document.createElement("form");
   formulario.innerHTML = ``;

    const listaTurnos = document.createElement("div");
    listaTurnos.id = "listaTurnos";
    
    body.appendChild(formulario);
    body.appendChild(listaTurnos);
}

function crearTurno(nombre, apellido, email, especialidad, fecha, hora) {
    let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
    const nuevoTurno = {
        id: Date.now(),
        nombre: nombre,
        email: email,
        apellido: apellido,
        especialidad: especialidad,
        fecha: fecha,
        hora: hora
    };
    turnos.push(nuevoTurno);
    localStorage.setItem('turnos', JSON.stringify(turnos));
    swal.fire({
        title: "Turno creado correctamente",
    });
    listarTurnos();
    limpiarFormulario();  
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("email").value = "";
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

        turnos.sort((a, b) => {
            const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
            const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);
            return fechaHoraA - fechaHoraB; 
        });

        turnos.forEach(turno => {
            listaTurnosDiv.innerHTML += `
                <p>
                    <strong>Paciente:</strong> ${turno.nombre}<br>
                    <strong>Apellido:</strong> ${turno.apellido}<br>
                    <strong>Email:</strong> ${turno.email}<br>
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
    Swal.fire({
        title: "¿Esta seguro de eliminar el turno",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#7acd65",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Estoy seguro!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminacion exitosa",
            text: "Su turno fue eliminado.",
            icon: "success"
          }); 
          let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
    turnos = turnos.filter(turno => turno.id !== id);
    localStorage.setItem('turnos', JSON.stringify(turnos));
    listarTurnos();
        }
      });
}

function inicializar() {
    crearHTML(); 
    document.getElementById("crearTurnoBtn").addEventListener("click", function() {
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const email = document.getElementById("email").value.trim();
        const especialidad = document.getElementById("especialidad").value.trim();
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;
        
        if (nombre && apellido && email && especialidad && fecha && hora) {
            
            if (!validarEmail(email)) {
                Swal.fire({
                    title: "Email inválido",
                    text: "Por favor, ingrese un email válido.",
                    icon: "warning"
                });
                return;
            }
            if (!validarHora(hora)) {
                Swal.fire({
                    title: "Hora inválida",
                    text: "Los turnos solo se pueden agendar entre las 8:00 y las 20:00.",
                    icon: "warning"
                });
                return;
            } 
          
            const turnoFechaHora = new Date(`${fecha}T${hora}`);
            const ahora = new Date();

            if (turnoFechaHora < ahora) {
                Swal.fire({
                    title: "Cuidado",
                    text: "No puedes agendar un turno anterior a la fecha actual",
                    icon: "warning"
                  });
                return;
            }

            crearTurno(nombre, apellido,email, especialidad, fecha, hora); 
        } else {
            Swal.fire({
                title: "Faltan",
                text: "Por favor, complete todos los datos.",
                icon: "warning"
              });
        }
    });
    listarTurnos(); 
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
    function validarHora(hora) {
        const [hours, minutes] = hora.split(":").map(Number);
        return (hours >= 8 && hours < 20);
    }
  

inicializar();
