# Setup Instructions

## Prerequisites
- Node.js installed on your machine

## Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/pythontilk/Valintines-day-askout-webiste.git
    ```

2. Navigate to the project directory:
    ```sh
    cd Valintines-day-askout-webiste/valentines-day-app/src
    
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

4. Update the IP address in `src/server.js` if running on a server:
    ```javascript
    // filepath: /c:/Users/Noel/Documents/GitHub/Valintines-day-askout-webiste/valentines-day-app/src/server.js
    const ip = 'your.server.ip.address';
    ```

5. Start the server:
    ```sh
    node src/server.js
    ```

6. Open your browser and navigate to:
    ```
    http://your.server.ip.address:3000
    ```

7. To create a custom link, submit the form on the homepage.
