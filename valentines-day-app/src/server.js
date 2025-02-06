const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

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
  const canSayNo = req.body.canSayNo === 'true';
  const timestamp = Date.now();
  const filename = 'askout_' + timestamp + '.html';
  const link = req.protocol + '://' + req.get('host') + '/links/' + filename;

    const askoutContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Valentine's Day Ask Out</title>
            <link rel="stylesheet" href="../styles.css">
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
                        window.location.href = '../yes.html';
                    });

      noButton.addEventListener('click', () => {
        noClickCount++;
        if (noClickCount >= 15) {
          if (canSayNo) {
            window.location.href = '../no.html';
          } else {
            if (window.innerWidth <= 768) { // Mobile
              noButton.style.display = 'none';
            } else { // PC
              document.addEventListener('mousemove', moveNoButton);
            }
          }
          return;
        }

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const radius = 100;

        let randomAngle = Math.random() * 2 * Math.PI;
        let randomRadius = Math.random() * radius;

        let randomX = centerX + randomRadius * Math.cos(randomAngle) - noButton.offsetWidth / 2;
        let randomY = centerY + randomRadius * Math.sin(randomAngle) - noButton.offsetHeight / 2;

        // Ensure the entire noButton remains within the viewport.
        if (randomX + noButton.offsetWidth > window.innerWidth) {
          randomX = window.innerWidth - noButton.offsetWidth;
        }
        if (randomX < 0) {
          randomX = 0;
        }
        if (randomY + noButton.offsetHeight > window.innerHeight) {
          randomY = window.innerHeight - noButton.offsetHeight;
        }
        if (randomY < 0) {
          randomY = 0;
        }

        noButton.style.left = \`\${randomX}px\`;
        noButton.style.top = \`\${randomY}px\`;

                        const currentScale = parseFloat(window.getComputedStyle(yesButton).transform.split(',')[0].slice(7)) || 1;
                        yesButton.style.transform = \`scale(\${currentScale + 0.1})\`;
                    });
                });
            </script>
        </body>
        </html>
    `;

  fs.writeFileSync(path.join(linksDir, filename), askoutContent);
  res.json({ link: link });
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