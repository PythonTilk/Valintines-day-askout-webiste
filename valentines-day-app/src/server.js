const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;
const ip = '159.89.4.228';

app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));

// Ensure the links directory exists
const linksDir = path.join(__dirname, 'links');
if (!fs.existsSync(linksDir)) {
    fs.mkdirSync(linksDir);
}

// Serve the main HTML file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/create-link', (req, res) => {
    const name = req.body.name;
    const timestamp = Date.now(); 
    const filename = `askout_${timestamp}.html`;
    const link = `${req.protocol}://${req.get('host')}/links/${filename}?name=${encodeURIComponent(name)}`;

    const askoutContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Valentine's Day Ask Out</title>
            <link rel="stylesheet" href="../styles.css">
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    text-align: center;
                }
                #valentineMessage, img {
                    transition: margin-top 0.3s ease;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="https://media.tenor.com/ns27oDL6PPIAAAAM/cats-cat-with-flower.gif" alt="Cat with flower">
                <h1 id="valentineMessage">${name}, will you be my Valentine date?</h1>
                <button id="yesButton" class="yes">Yes</button>
                <button id="noButton" class="no">No</button>
            </div>
            <script>
                document.addEventListener('DOMContentLoaded', () => {
                    let noClickCount = 0;

                    const yesButton = document.getElementById('yesButton');
                    const noButton = document.getElementById('noButton');
                    const valentineMessage = document.getElementById('valentineMessage');
                    const gif = document.querySelector('img');
                    const maxTopMargin = 20; // Maximum top margin for the text and GIF

                    document.getElementById('yesButton').addEventListener('click', function() {
                        window.location.href = '../yes.html';
                    });

                    document.getElementById('noButton').addEventListener('click', function() {
                        noClickCount++;
                        if (noClickCount >= 100) {
                            window.location.href = '../no.html';
                            return;
                        }

                        let randomX, randomY;
                        do {
                            randomX = Math.random() * (window.innerWidth - this.offsetWidth);
                            randomY = Math.random() * (window.innerHeight - this.offsetHeight);
                        } while (
                            (randomX < yesButton.offsetLeft + yesButton.offsetWidth && randomX + this.offsetWidth > yesButton.offsetLeft) ||
                            (randomY < yesButton.offsetTop + yesButton.offsetHeight && randomY + this.offsetHeight > yesButton.offsetTop) ||
                            (randomY < valentineMessage.offsetTop + valentineMessage.offsetHeight)
                        );

                        this.style.position = 'absolute';
                        this.style.left = \`\${randomX}px\`;
                        this.style.top = \`\${randomY}px\`;

                        const currentScale = parseFloat(window.getComputedStyle(yesButton).transform.split(',')[0].slice(7)) || 1;
                        const newScale = currentScale + 0.1;

                        if (parseInt(valentineMessage.style.marginTop) <= maxTopMargin) {
                            noButton.style.display = 'none';
                        } else {
                            yesButton.style.transform = \`scale(\${newScale})\`;
                            const newMarginTop = Math.min(maxTopMargin, -newScale * 20);
                            valentineMessage.style.marginTop = \`\${newMarginTop}px\`;
                            gif.style.marginTop = \`\${newMarginTop}px\`;
                        }
                    });
                });
            </script>
            <footer style="position: absolute; bottom: 0; width: 100%;">
                <div>Made with <span class="animated-heart">❤️</span> by pythontilk</div>
                <br>
                <a href="https://tilk.tech" target="_blank">Look at my other projects here</a>
            </footer>
        </body>
        </html>
    `;

    fs.writeFileSync(path.join(linksDir, filename), askoutContent);
    res.send(`<a href="${link}" target="_blank">Your custom link</a>`);
});

app.get('/yes.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'yes.html'));
});

app.get('/no.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'no.html'));
});

app.get('/links/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(linksDir, filename));
});

app.listen(port, ip, () => {
    console.log(`Server running at http://${ip}:${port}`);
});
