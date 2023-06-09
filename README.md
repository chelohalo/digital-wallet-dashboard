# Wallets App

This project is a web application that requires both a server and client to be running.

# Getting Started

To get started with the project, follow these instructions:

- Clone the repository to your local machine.
- Navigate to the server in your terminal.
- Run npm install to install the dependencies for the server.
- Navigate to the client directory and run npm install to install the dependencies for the client.
- Start a local Docker container for the database. For example, you can run the following command to start a Postgres container:\
`docker run --name wallet-postgres-db -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`
- Run the following command to deploy the database schema to the container:\
  `npx prisma migrate deploy`

# Running the Application
 - Navigate to the server directory of the project in your terminal.
  - Run `npm start` to start the server.
  - Navigate to the client directory of the project in your terminal.
  - Run `npm start` to start the client.

# Add your etherscan API key in the .env file

# Add valid wallet data

```0x56Eddb7aa87536c09CCc2793473599fD21A8b17F
0x1bAc08001D761C303901d5E32273a24c07D3f3Da
0x79672062c5a45E3808D6B784129Cf3eCF59d4224
0x4c9AF439b1A6761B8E549D8d226A468a6b2803A8
0xcD2950648B384facffAe16a829e46872357864D6
0x57cCcfdf98c04d6E40C25ba842335D809f0f6222
0x61cEe17cA7268b69BbdD06De3FB097944e5e9981
0xe227f5Eb752159C7FFA07F2a041894734EaACF5C
0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326
0xdAC17F958D2ee523a2206206994597C13D831ec7
0xBd9B34cCbb8db0FDECb532B1EAF5D46f5b673fE8

