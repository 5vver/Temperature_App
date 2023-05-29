# Temperature App

Simple temperature sensor Node Express + React JS implementation along with PrismaDB  


Commands
----

    cd /server
    change .env content to your DATABASE_URL
    npx prisma init
    npx prisma generate
    npm start

    cd /client
    npm run dev

Preferably, you can download it by cloning the [Git](https://github.com/5vver/Temperature_App) repository:

    git clone https://github.com/5vver/Temperature_App.git

DB_Commands
----

    CREATE TABLE Temperature (
        id SERIAL PRIMARY KEY,
        temp INT DEFAULT 20
    );

    CREATE TABLE Humidity (
        id SERIAL PRIMARY KEY,
        hum INT DEFAULT 20
    );

    INSERT INTO Temperature values (1,20)
    INSERT INTO Humidity values (1,13)