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
  const canSayNo = req.body.canSayNo === 'true';
  const timestamp = Date.now();
  const filename = 'askout_' + timestamp + '.html';
  const link = req.protocol + '://' + req.get('host') + '/links/' + filename;

  const askoutContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Valentine's Day Ask Out</title>
  <link rel="stylesheet" href="../styles.css" />
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      overflow: hidden;
      background-color: #ffe6e6;
      font-family: 'Comic Sans MS', cursive, sans-serif;
    }
    .container {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    #noButton {
      transition: all 0.3s ease;
      position: fixed;
    }
    h1 {
      color: #ff4d4d;
      font-size: 2.5em;
    }
    button {
      background-color: #ff4d4d;
      color: white;
      border: none;
      border-radius: 10px;
      padding: 15px 30px;
      font-size: 1.2em;
      cursor: pointer;
      transition: transform 0.3s ease, background-color 0.3s ease;
    }
    button:hover {
      background-color: #ff3333;
    }
    button:active {
      transform: scale(1.1);
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="https://media.tenor.com/RBa37_6ApVcAAAAi/cute-adorable.gif" alt="Cute gif">
    <h1 id="valentineMessage">${name}, will you be my Valentine date?</h1>
    <button id="yesButton" class="yes">Yes</button>
    <button id="noButton" class="no">No</button>
  </div>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      let noClickCount = 0;
      const valentineMessage = document.getElementById('valentineMessage');
      const yesButton = document.getElementById('yesButton');
      const noButton = document.getElementById('noButton');
      const canSayNo = ${canSayNo};

      const phrases = ["No", "Are you sure?", "What if I asked really nicely?", "Pretty please", "With a chocolate rice cake on top", "What about a matcha frostie", "PLEASE POOKIE", "But :*(", "I am going to die", "Yep im dead", "ok ur talking to nathan's ghost", "please babe", ":((((", "PRETTY PLEASE", "Estoy muerto", "No :("];

      yesButton.addEventListener('click', () => {
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

        // Scale up yes button
        const currentScale = parseFloat(getComputedStyle(yesButton).transform.split(',')[3]) || 1;
        yesButton.style.transform = \`scale(\${currentScale + 0.1})\`;

        // Move message up
        valentineMessage.style.transform = \`translateY(\${-noClickCount * 10}px)\`;

        // Update no button text
        noButton.textContent = phrases[noClickCount - 1];
      });

      function moveNoButton(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const buttonRect = noButton.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;

        const distanceX = buttonCenterX - mouseX;
        const distanceY = buttonCenterY - mouseY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < 100) {
          const angle = Math.atan2(distanceY, distanceX);
          const newX = buttonCenterX + Math.cos(angle) * 100;
          const newY = buttonCenterY + Math.sin(angle) * 100;

          noButton.style.left = \`\${newX - buttonRect.width / 2}px\`;
          noButton.style.top = \`\${newY - buttonRect.height / 2}px\`;
        }
      }
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
  console.log("Server running at http://" + ip + ":" + port);
});
