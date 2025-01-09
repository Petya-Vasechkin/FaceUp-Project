import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'notifications_db_faceup',
    password: '22081998Pav', // Change password
    port: 5432
});

// Test connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Successfully connected to database');
});

export default pool;
