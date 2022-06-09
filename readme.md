# Node.js/Express App

## Requirements
backend -> node.js, express
frontend -> html, css, js

## Description
Simple full stack app development using JENCH (Javascript, Express, Node, CSS, HTML).

Frontend is built using html, css, javascript while the backend is built with node.js

The data is provided in a json file to simulate a database and this is served by the
backend to our frontend client.

Backend is hosted on Heroku while frontend is on Netlify.

### Run Application
In backend folder, enter below command:
	node server.js -> production
	DEBUG=node-express-start/backend:* nodemon ./bin/www -> development
when the backend server is running, change to the frontend folder and
enter the command below:
live-server --browser=firefox   (or with option --browser=chrome if you prefer google-chrome browser)