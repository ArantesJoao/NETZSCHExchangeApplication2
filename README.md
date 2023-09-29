# NETZSCH Exchange - Web Application

## Overview
The NETZSCH Exchange Web Application is a React Application with a Node Server developed as part of a technical challenge for NETZSCH. The application showcases real-time communication between a web-based platform and a desktop application. Users can input messages and observe them real-time from its desktop counterpart.

## Prerequisites
Node.js and npm installed on your machine

## Setup & Installation
- First of all, install the packages by running this at the root folder
```
npm install
```

- To run the Node server that instantiates the WebSocket used at the communication, run
```
cd src
cd server
node index.js
```

- Then, in a separate terminal, go back to the root project folder and just run
```
npm start
```

- Now, your Web Application should be running on http://localhost:3000
