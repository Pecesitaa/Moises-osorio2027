// Variables globales
let audioElement = null;
let musicaReproduciendo = false;

// Inicializar audio
function iniciarAudio() {
    audioElement = document.getElementById('cancionFondo');
    if (!audioElement) return;
    
    audioElement.loop = true;
    audioElement.volume = 0.4;
    
    audioElement.addEventListener('error', () => {
        console.log('⚠️ Usando canción de respaldo');
    });
}

// Control de música
function toggleMusica() {
    if (!audioElement) return;
    
    const musicBtn = document.getElementById('musicButton');
    
    if (musicaReproduciendo) {
        audioElement.pause();
        musicaReproduciendo = false;
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = '<i class="fas fa-music"></i><span class="music-text">🎵 Nuestra canción</span>';
        mostrarNotificacion('⏸️ Música pausada', '#ff9999');
    } else {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicaReproduciendo = true;
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<i class="fas fa-music"></i><span class="music-text">🎶 Sonando ♪</span>';
                mostrarNotificacion('🎵 ¡Música activada! ❤️', '#4caf50');
                crearNotasMusicales();
            }).catch(() => {
                mostrarNotificacion('🔊 Haz clic aquí para activar la música', '#ff8a5e');
            });
        }
    }
}

// Notificación flotante
function mostrarNotificacion(mensaje, colorBg) {
    const notif = document.createElement('div');
    notif.textContent = mensaje;
    notif.style.position = 'fixed';
    notif.style.bottom = '90px';
    notif.style.right = '20px';
    notif.style.backgroundColor = colorBg;
    notif.style.color = 'white';
    notif.style.padding = '8px 16px';
    notif.style.borderRadius = '30px';
    notif.style.fontWeight = 'bold';
    notif.style.zIndex = '1001';
    notif.style.fontSize = '0.8rem';
    notif.style.fontFamily = 'Quicksand, sans-serif';
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 500);
    }, 2500);
}

// Notas musicales visuales
function crearNotasMusicales() {
    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            const nota = document.createElement('i');
            nota.classList.add('fas', 'fa-music');
            nota.style.position = 'fixed';
            nota.style.left = Math.random() * window.innerWidth + 'px';
            nota.style.bottom = '20px';
            nota.style.fontSize = (Math.random() * 16 + 14) + 'px';
            nota.style.color = `hsl(${Math.random() * 30 + 320}, 80%, 65%)`;
            nota.style.zIndex = '9999';
            nota.style.pointerEvents = 'none';
            document.body.appendChild(nota);
            
            let posY = 0;
            const interval = setInterval(() => {
                posY += 3;
                nota.style.bottom = (parseFloat(nota.style.bottom) + 5) + 'px';
                nota.style.opacity = (1 - posY / 250);
                if (posY > 250) {
                    nota.remove();
                    clearInterval(interval);
                }
            }, 30);
        }, i * 150);
    }
}

// Regalo sorpresa (mensajes fijos desde código)
const mensajesSorpresa = [
  
    
    
    
    
];

function setupSorpresa() {
    const btn = document.getElementById('btnSorpresa');
    const sorpresaDiv = document.getElementById('sorpresaMensaje');
    
    btn?.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * mensajesSorpresa.length);
        sorpresaDiv.innerHTML = `<i class="fas fa-gift"></i> ${mensajesSorpresa[randomIndex]} <div style='margin-top:8px;'></div>`;
        sorpresaDiv.classList.add('show');
        
        // Confeti de corazones
        for(let i = 0; i < 15; i++) {
            setTimeout(() => {
                const confeti = document.createElement('i');
                confeti.classList.add('fas', 'fa-heart');
                confeti.style.position = 'fixed';
                confeti.style.left = Math.random() * window.innerWidth + 'px';
                confeti.style.top = '-20px';
                confeti.style.fontSize = (Math.random() * 14 + 10) + 'px';
                confeti.style.color = `hsl(${Math.random() * 30 + 340}, 80%, 65%)`;
                confeti.style.zIndex = '9999';
                document.body.appendChild(confeti);
                
                let fall = 0;
                const interval = setInterval(() => {
                    if(fall > window.innerHeight + 50) {
                        confeti.remove();
                        clearInterval(interval);
                        return;
                    }
                    confeti.style.top = (parseInt(confeti.style.top) + 3 + Math.random() * 4) + 'px';
                    confeti.style.left = (parseFloat(confeti.style.left) + (Math.random() - 0.5) * 2) + 'px';
                    fall += 4;
                }, 30);
                setTimeout(() => { confeti.remove(); clearInterval(interval); }, 2500);
            }, i * 80);
        }
        
        setTimeout(() => {
            sorpresaDiv.classList.remove('show');
        }, 5000);
    });
}

// Inicializar todo
document.addEventListener('DOMContentLoaded', () => {
    iniciarAudio();
    setupSorpresa();
    
    const musicBtn = document.getElementById('musicButton');
    if (musicBtn) musicBtn.addEventListener('click', toggleMusica);
});

window.addEventListener('beforeunload', () => {
    if (audioElement) audioElement.pause();
});