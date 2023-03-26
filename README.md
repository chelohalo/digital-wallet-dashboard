Project Name
This project is a web application that requires both a server and client to be running.

Getting Started
To get started with the project, follow these instructions:

Clone the repository to your local machine.

Navigate to the root directory of the project in your terminal.

Run npm install to install the dependencies for the server.

Navigate to the client directory and run npm install to install the dependencies for the client.

Start a local Docker container for the database. For example, you can run the following command to start a Postgres container:
docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

This command starts a Postgres container named my-postgres with a password of mysecretpassword and maps port 5432 to the host.

Start the server by navigating to the root directory of the project in your terminal and running npm start. The server will start running on http://localhost:3000.

Start the client by navigating to the client directory in your terminal and running npm start. The client will start running on http://localhost:3001.

