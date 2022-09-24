const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


const app = express();


app.get('/health', (__request, response) => response.json({ok: 'health'}));

app.get('/', (request, response) => {
    
    connection.query('INSERT INTO users (name) VALUES ("new user")');

    connection.query('select * from users', (err, rows) => {
        if(err){
            response.status(400).json({err: err});
        };

        const users = rows.map(row => `<p>${row.name}</p>`).join('\n');

        response.end(
            '<p>Usuarios</p>\n' + users
        );
    });
})

app.listen(3000, () => console.log('Server is up ...'));