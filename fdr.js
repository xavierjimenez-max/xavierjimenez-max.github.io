// fdr.js - Carrusel corregido y seguro
document.addEventListener('DOMContentLoaded', function () {
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const carousel = document.querySelector('.carousel');
    const list = document.querySelector('.list');
    const runningTime = document.querySelector('.timeRunning');

    // Verificar que todos los elementos existan
    if (!nextBtn || !prevBtn || !list || !runningTime) {
        console.error('No se encontraron elementos del carrusel. Verifica el HTML.');
        return;
    }

    let timeRunning = 700;        // Duración de la transición (ms)
    let timeAutoNext = 7000;      // Tiempo entre cambios automáticos

    let runTimeOut;
    let runNextAuto;

    // Reiniciar animación de la barra de tiempo
    function resetTimeAnimation() {
        runningTime.style.animation = 'none';
        runningTime.offsetHeight; // Reflow para reiniciar
        runningTime.style.animation = 'runningTime 7s linear 1 forwards';
    }

    // Mostrar siguiente o anterior
    function showSlider(type) {
        const items = list.querySelectorAll('.item');
        if (items.length < 2) return;

        if (type === 'next') {
            list.appendChild(items[0]);
            carousel.classList.add('next');
        } else {
            list.prepend(items[items.length - 1]);
            carousel.classList.add('prev');
        }

        // Remover clases de animación después de la transición
        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carousel.classList.remove('next', 'prev');
        }, timeRunning);

        // Reiniciar autoplay
        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextBtn.click();
        }, timeAutoNext);

        // Reiniciar barra de tiempo
        resetTimeAnimation();
    }

    // Eventos de botones
    nextBtn.addEventListener('click', () => showSlider('next'));
    prevBtn.addEventListener('click', () => showSlider('prev'));

    // Iniciar barra de tiempo y autoplay
    resetTimeAnimation();
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);
});