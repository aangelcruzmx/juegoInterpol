document.addEventListener('DOMContentLoaded', function() {
    var gameArea = document.getElementById('gameArea');
    var fugitivo = document.getElementById('fugitivo');
    var score = 0;
    var clicks = 0;
    var nivel = 1; // nivel inicial
    var interval = actualizarIntervaloPorNivel(nivel);
    var maxClicks = 5; // Maximo de clicks permitidos por nivel
    var intervalID;

    //popup
    var popupBackground = document.getElementById('popupBackground');
    var closePopupButton = document.getElementById('closePopup');
    closePopupButton.addEventListener('click', function() {
        popupBackground.style.display = 'none'; // Ocultar el popup
        
    });
    function mostrarPopup() {
        popupBackground.style.display = 'flex';
    }
    function gameOver(atrapado) {
        
        mostrarPopup();
        var mensaje;
        if (atrapado) {
            mensaje = '¡Bien hecho, has capturado al fugitivo!';
            } else {
                mensaje = 'El fugitivo ha escapado. ¡Inténtalo de nuevo!';
                }
                document.querySelector('#popupContainer p').textContent = mensaje;
    }

    //
    actualizarContenidoNivel(nivel);

    //establece la velocidad del fugitivo
    function actualizarIntervaloPorNivel(nivel) {
        switch(nivel) {
            case 1:
                return 1200;
            case 2:
                return 800;
            case 3:
                return 500;
            default:
                return 1200; // regreso al nivel 1 si se superan los 3 niveles
        }
    }

    //genero el movimiento aleatorio del fugitivo
    function moveFugitivo() {
        if (clicks >= maxClicks) {
            gameOver(false); // si el jugador ha fallado en atrapar al fugitivo en los clicks dados
            return;
        }

        var maxX = gameArea.clientWidth - fugitivo.clientWidth;
        var maxY = gameArea.clientHeight - fugitivo.clientHeight;

        var randomX = Math.floor(Math.random() * maxX);
        var randomY = Math.floor(Math.random() * maxY);

        fugitivo.style.left = randomX + 'px';
        fugitivo.style.top = randomY + 'px';
    }

    //para los click
    fugitivo.addEventListener('click', function() {
        score++;
        clicks = 0; // para reestablecer los lcicks
        if (nivel < 3) {
            nivel++;
            clearInterval(intervalID);
            intervalID = setInterval(moveFugitivo, actualizarIntervaloPorNivel(nivel));
            actualizarContenidoNivel(nivel);
            alert('¡Bien hecho! Ahora pasas al nivel ' + nivel + '.');
            moveFugitivo();
        } else {
            gameOver(true); // fin del juego
        }
    });

    gameArea.addEventListener('click', function() {
        clicks++;
        if (clicks >= maxClicks) {
            moveFugitivo(); //  mover el fugitivo si aun se permite
        }
    });

    intervalID = setInterval(moveFugitivo, interval);

    //finalizar el juego
    function gameOver(atrapado) {
        clearInterval(intervalID);
        var mensajeFinal = atrapado ? '¡Has atrapado al fugitivo! Puntuación final: ' + score : 'Juego terminado. Puntuación: ' + score;
        alert(mensajeFinal);
        location.reload(); // Recarga la pagina
    }

    //llamada a cada una de las imagenes de los fugitivos y su descripcion, lo hice aqui por que me fue mas facil que en el html despues de varias pruebas
    function actualizarContenidoNivel(nivel) {
        var imagen = document.querySelector('#rectanguloNegro1 img');
        var parrafo = document.querySelector('#rectanguloNegro2 p');
        
        switch(nivel) {
            case 1:
                imagen.src = "../../img/juego/juegoInterpol/fugitivoNivel1.jpg";
                parrafo.textContent = "Tarjeta: Azul. Juan Pérez,  34 años, Nacionalidad: Española. Buscado por fraude. Considerado escurridizo pero no violento. Última vez visto en Madrid.";
                
                break;
            case 2:
                imagen.src = "../../img/juego/juegoInterpol/fugitivoNivel2.jpg";
                parrafo.textContent = "Tarjeta: Naranja. Maria Gómez, 29 años, Nacionalidad: Colombiana. Buscada por hackeo y ciberdelincuencia. Altamente inteligente y difícil de rastrear. Última vez vista en Bogotá.";
                break;
            case 3:
                imagen.src = "../../img/juego/juegoInterpol/fugitivoNivel3.jpg";
                parrafo.textContent = "Tarjeta: Roja. Carlos Rodríguez, 40 años, Nacionalidad: Mexicana. Buscado por terrorismo y crímenes contra la humanidad. Extremadamente peligroso. Última vez visto en Ciudad de México.";
                break;
            default:
                imagen.src = ""; // para establecer una imagen por defecto.... sin definir
                parrafo.textContent = "Descripcion...";
        }
    }
});
