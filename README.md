# Valentine's Day Link Generator

This web application allows users to generate custom links for asking someone out on Valentine's Day. The generated HTML file presents a fun interactive choice between "Yes" and "No".

## Project Structure

```
valentines-day-app
├── src
│   ├── index.html       # HTML structure for the application
│   ├── styles.css       # Styles for the application
│   ├── app.js           # JavaScript logic for interactivity
│   ├── server.js        # Server-side logic
│   ├── yes.html         # HTML for the "Yes" response
│   ├── no.html          # HTML for the "No" response
│   └── package.json     # Project dependencies and scripts
└── README.md            # Documentation for the project
```

## Features

- **Interactive Buttons**: Users can click "Yes" or "No" to respond to the Valentine's Day proposal.
- **Dynamic Behavior**: 
  - Clicking "Yes" enlarges the button.
  - Clicking "No" moves the button to a random location on the screen.
- **Custom Link Generation**: Generate a custom link for asking someone out.
- **Copy Link to Clipboard**: Copy the generated link to the clipboard with a notification popup.

## Getting Started

### Final Project (Server)

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/yourusername/Valintines-day-askout-webiste.git
    cd Valintines-day-askout-webiste/valentines-day-app/src
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Start the Server**:
    ```sh
    npm start
    ```

4. **Open Your Browser**:
    Navigate to `http://localhost:3000`.


## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express

## License

This project is open-source and available under the MIT License.