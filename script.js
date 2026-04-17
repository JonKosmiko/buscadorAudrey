const inputInicio = document.getElementById('input-inicio');
const inputResultados = document.getElementById('input-resultados');
const fraseMagica = "Audrey Hepburn";
let indexLetra = 0;

function alternarBusqueda(pantallaActual) {
    if (pantallaActual === 'pantalla-inicio') {
        inputResultados.value = inputInicio.value;
        document.getElementById('pantalla-inicio').classList.remove('activa');
        document.getElementById('pantalla-resultados').classList.add('activa');
        document.body.classList.remove('pantalla-inicio-activa');
        document.body.classList.add('pantalla-resultados-activa');

        inputInicio.blur();
        inputResultados.blur();
        window.scrollTo(0, 0);
    } else {
        // --- CORRECCIONES AQUÍ ---
        inputInicio.value = ""; 
        inputResultados.value = ""; // Limpiamos ambos para el siguiente truco
        indexLetra = 0;             // REINICIAMOS el contador para poder escribir de nuevo
        // -------------------------

        document.getElementById('pantalla-resultados').classList.remove('activa');
        document.getElementById('pantalla-inicio').classList.add('activa');
        document.body.classList.remove('pantalla-resultados-activa');
        document.body.classList.add('pantalla-inicio-activa');

        inputInicio.blur();
        window.scrollTo(0, 0);
    }
}

function siPulsaEnter(event) {
    if (event.key === "Enter") {
        if (document.getElementById('pantalla-inicio').classList.contains('activa')) {
            alternarBusqueda('pantalla-inicio');
        }
        if (event.target) event.target.blur();
    }
}

const inputs = [inputInicio, inputResultados];

inputs.forEach(input => {
    if(!input) return; 

    input.addEventListener('keydown', function(e) {
        // Bloqueamos teclas normales para que no se escriban caracteres reales
        if (e.key.length === 1 || e.key === "Backspace") {
            e.preventDefault();
        } else {
            return;
        }

        // Lógica de borrar
        if (e.key === "Backspace") {
            if (indexLetra > 0) {
                indexLetra--;
                this.value = fraseMagica.substring(0, indexLetra);
            }
            return;
        }

        // Escribir la frase mágica letra a letra
        if (indexLetra < fraseMagica.length) {
            this.value += fraseMagica[indexLetra];
            indexLetra++;

            // Auto-búsqueda al terminar la frase
            if (indexLetra === fraseMagica.length) {
                siPulsaEnter({ key: "Enter", target: this });
            }
        }
    });
});