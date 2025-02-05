document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const createLinkForm = document.getElementById('createLinkForm');
    const linkContainer = document.getElementById('linkContainer');
    const valentineMessage = document.getElementById('valentineMessage');
    let noClickCount = 0;

    const beggingPhrases = [
        "Please reconsider!",
        "Are you sure?",
        "Think about it!",
        "Don't say no!",
        "Give it a chance!",
        "Please!",
        "Just one more time!",
        "I beg you!",
        "Pretty please!",
        "Don't break my heart!",
        "Please don't say no!",
        "I'm begging you!",
        "Please think again!",
        "Don't do this!",
        "Please don't!",
        "Just say yes!",
        "Please, please!",
        "I'm on my knees!",
        "Don't make me cry!",
        "Please be kind!",
        "I'm pleading!",
        "Please be my Valentine!",
        "Don't say no again!",
        "Please, I'm asking nicely!",
        "Just this once!",
        "Please don't reject me!",
        "I'm asking you!",
        "Please, it's Valentine's Day!",
        "Don't make me sad!",
        "Please, I'm desperate!",
        "Just say yes, please!",
        "Please, it's important!",
        "Don't say no, please!",
        "Please, I'm serious!",
        "Just one yes!",
        "Please, I'm trying!",
        "Don't make me beg!",
        "Please, it's special!",
        "Just this time!",
        "Please, I'm hopeful!",
        "Don't say no, think!",
        "Please, I'm sincere!",
        "Just say yes, please!",
        "Please, it's a request!",
        "Don't say no, please!",
        "Please, I'm asking!",
        "Just one yes, please!",
        "Please, it's love!",
        "Don't say no, please!",
        "Please, I'm here!",
        "Just say yes, please!",
        "Please, it's a wish!",
        "Don't say no, please!",
        "Please, I'm waiting!",
        "Just one yes, please!",
        "Please, it's a dream!",
        "Don't say no, please!",
        "Please, I'm hoping!",
        "Just say yes, please!",
        "Please, it's a plea!",
        "Don't say no, please!",
        "Please, I'm here!",
        "Just one yes, please!",
        "Please, it's a hope!",
        "Don't say no, please!",
        "Please, I'm asking!",
        "Just say yes, please!",
        "Please, it's a wish!",
        "Don't say no, please!",
        "Please, I'm waiting!",
        "Just one yes, please!",
        "Please, it's a dream!",
        "Don't say no, please!",
        "Please, I'm hoping!",
        "Just say yes, please!",
        "Please, it's a plea!",
        "Don't say no, please!",
        "Please, I'm here!",
        "Just one yes, please!",
        "Please, it's a hope!"
    ];

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
            (randomY < valentineMessage.offsetTop + valentineMessage.offsetHeight)
        );

        noButton.style.position = 'absolute';
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;

        const currentScale = parseFloat(window.getComputedStyle(yesButton).transform.split(',')[0].slice(7)) || 1;
        yesButton.style.transform = `scale(${currentScale + 0.1})`;
        valentineMessage.style.marginTop = `${-currentScale * 20}px`;

        noButton.textContent = beggingPhrases[noClickCount % beggingPhrases.length];
    });
});