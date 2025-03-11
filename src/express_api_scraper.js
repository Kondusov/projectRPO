const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware для обработки JSON
app.use(express.json());

// Подключение к базе данных SQLite
const db = new sqlite3.Database('./database.sqlite', err => {
	if (err) {
		console.error('Ошибка подключения к базе данных:', err);
	} else {
		console.log('Подключено к базе данных SQLite');
		db.run(`CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            body TEXT NOT NULL
        )`);
	}
});

// Получить все элементы
app.get('/items', (req, res) => {
	db.all('SELECT * FROM items', [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json(rows);
	});
});

// Получить элемент по ID
app.get('/items/:id', (req, res) => {
	const itemId = req.params.id;
	db.get('SELECT * FROM items WHERE id = ?', [itemId], (err, row) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		if (row) {
			res.json(row);
		} else {
			res.status(404).send('Item not found');
		}
	});
});

// Создать новый элемент
app.post('/items', (req, res) => {
	const { title, body } = req.body;
	db.run(
		'INSERT INTO items (title, body) VALUES (?, ?)',
		[title, body],
		function (err) {
			if (err) {
				res.status(500).json({ error: err.message });
				return;
			}
			res.status(201).json({ id: this.lastID, title, body });
		}
	);
});

// Редактировать элемент
app.put('/items/:id', (req, res) => {
	const itemId = req.params.id;
	const { title, body } = req.body;
	db.run(
		'UPDATE items SET title = ?, body = ? WHERE id = ?',
		[title, body, itemId],
		function (err) {
			if (err) {
				res.status(500).json({ error: err.message });
				return;
			}
			res.status(204).send();
		}
	);
});

// Экспортируем приложение для тестов
module.exports = app;

// Запуск сервера
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
