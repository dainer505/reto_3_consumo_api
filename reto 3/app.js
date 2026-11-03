const ENDPOINT_API = "https://jsonplaceholder.typicode.com/users";

async function obtenerYProcesarDatos() {
    const contenedorTabla = document.getElementById("listadoUsuarios");
    
    if (!contenedorTabla) {
        console.error("No se encontró el elemento con ID 'listadoUsuarios' en el HTML.");
        return;
    }

    try {
        const respuestaServidor = await fetch(ENDPOINT_API);

        if (!respuestaServidor.ok) {
            throw new Error(`Falla en la conexión HTTP. Código: ${respuestaServidor.status}`);
        }

        const registros = await respuestaServidor.json();
        contenedorTabla.innerHTML = "";
        
        registros.forEach((item, index) => {
            const filaElemento = document.createElement("tr");
            
            filaElemento.style.animationDelay = `${index * 0.08}s`;

            filaElemento.innerHTML = `
                <td><strong>${item.name}</strong></td>
                <td><span style="color: #38bdf8;">${item.email}</span></td>
                <td><code>${item.phone}</code></td>
                <td>${item.company.name}</td>
            `;

            contenedorTabla.appendChild(filaElemento);
        });

        console.log("Datos obtenidos correctamente");

    } catch (err) {
        console.error("Se produjo un error al consumir la API:", err);
        contenedorTabla.innerHTML = `
            <tr>
                <td colspan="4" class="alerta-error">No se pudieron cargar los datos de la API correctamente.</td>
            </tr>
        `;
    }
}

obtenerYProcesarDatos();