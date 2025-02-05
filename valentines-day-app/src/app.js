document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const createLinkForm = document.getElementById('createLinkForm');
    const linkContainer = document.getElementById('linkContainer');
    let noClickCount = 0;

    createLinkForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const link = `askout_${Date.now()}.html?name=${encodeURIComponent(name)}`;
        linkContainer.innerHTML = `<a href="${link}" target="_blank">Your custom link</a>`;
    });

    yesButton.addEventListener('click', () => {
        window.location.href = 'yes.html';
    });

    noButton.addEventListener('click', () => {
        noClickCount++;
        if (noClickCount >= 100) {
            window.location.href = 'no.html';
            return;
        }

        let randomX, randomY;
        do {
            randomX = Math.random() * (window.innerWidth - noButton.offsetWidth);
            randomY = Math.random() * (window.innerHeight - noButton.offsetHeight);
        } while (
            (randomX < yesButton.offsetLeft + yesButton.offsetWidth && randomX + noButton.offsetWidth > yesButton.offsetLeft) ||
            (randomY < yesButton.offsetTop + yesButton.offsetHeight && randomY + noButton.offsetHeight > yesButton.offsetTop) ||
            (randomY < document.getElementById('valentineMessage').offsetTop + document.getElementById('valentineMessage').offsetHeight)
        );

        noButton.style.position = 'absolute';
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;

        const currentScale = parseFloat(window.getComputedStyle(yesButton).transform.split(',')[0].slice(7)) || 1;
        yesButton.style.transform = `scale(${currentScale + 0.1})`;
    });
});