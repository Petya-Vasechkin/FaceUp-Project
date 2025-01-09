import express, { Request, Response } from 'express';
import pool from '../config/database';


const router = express.Router();

// GET: Get all notifications
router.get('/notifications', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notifications ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET: Get notification by ID
router.get('/notifications/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM notifications WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Notification not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST: Create a new notification
router.post('/notifications', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const { category, sender_name, sender_age, details, file_url } = req.body;
        const result = await pool.query(
            'INSERT INTO notifications (category, sender_name, sender_age, details, file_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [category, sender_name, sender_age, details, file_url]
        );
        console.log('Inserted data:', result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT: Update a notification by ID
router.put('/notifications/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { category, sender_name, sender_age, details, file_url } = req.body;
        
        const result = await pool.query(
            'UPDATE notifications SET category = $1, sender_name = $2, sender_age = $3, details = $4, file_url = $5 WHERE id = $6 RETURNING *',
            [category, sender_name, sender_age, details, file_url, id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Notification not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE: Delete a notification by ID
router.delete('/notifications/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM notifications WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Notification not found' });
        }

        res.json({ message: 'Notification deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
