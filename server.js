const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.urlencoded({ extended: true }));

app.post('/create-link', (req, res) => {
    const name = req.body.name;
    const timestamp = Date.now();
    const filename = `askout_${timestamp}.html`;
    const link = `${req.protocol}://${req.get('host')}/${filename}?name=${encodeURIComponent(name)}`;

    const askoutContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Valentine's Day Ask Out</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <div class="container">
                <h1 id="valentineMessage">${name}, will you be my Valentine date?</h1>
                <button id="yesButton" class="yes">Yes</button>
                <button id="noButton" class="no">No</button>
            </div>
            <script>
                document.addEventListener('DOMContentLoaded', () => {
                    let noClickCount = 0;

                    document.getElementById('yesButton').addEventListener('click', function() {
                        window.location.href = 'yes.html';
                    });

                    document.getElementById('noButton').addEventListener('click', function() {
                        noClickCount++;
                        if (noClickCount >= 100) {
                            window.location.href = 'no.html';
                            return;
                        }

                        let randomX, randomY;
                        do {
                            randomX = Math.random() * (window.innerWidth - this.offsetWidth);
                            randomY = Math.random() * (window.innerHeight - this.offsetHeight);
                        } while (
                            (randomX < yesButton.offsetLeft + yesButton.offsetWidth && randomX + this.offsetWidth > yesButton.offsetLeft) ||
                            (randomY < yesButton.offsetTop + yesButton.offsetHeight && randomY + this.offsetHeight > yesButton.offsetTop) ||
                            (randomY < document.getElementById('valentineMessage').offsetTop + document.getElementById('valentineMessage').offsetHeight)
                        );

                        this.style.position = 'absolute';
                        this.style.left = \`\${randomX}px\`;
                        this.style.top = \`\${randomY}px\`;

                        const currentScale = parseFloat(window.getComputedStyle(yesButton).transform.split(',')[0].slice(7)) || 1;
                        yesButton.style.transform = \`scale(\${currentScale + 0.1})\`;
                    });
                });
            </script>
        </body>
        </html>
    `;

    fs.writeFileSync(path.join(__dirname, 'src', filename), askoutContent);
    res.send(`<a href="${link}" target="_blank">Your custom link</a>`);
});

app.get('/yes.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'yes.html'));
});

app.get('/no.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'no.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
