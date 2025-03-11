from flask import Flask, jsonify, request

app = Flask(__name__)

# Простая база данных (в реальном приложении используйте базу данных)
books = [
    {"id": 1, "title": "Книга 1", "author": "Автор 1"},
    {"id": 2, "title": "Книга 2", "author": "Автор 2"}
]

# GET: Получить все книги
@app.route('/books', methods=['GET'])
def get_books():
    return jsonify(books)

# GET: Получить книгу по ID
@app.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = next((book for book in books if book['id'] == book_id), None)
    if book is None:
        return jsonify({"message": "Книга не найдена"}), 404
    return jsonify(book)

# POST: Добавить новую книгу
@app.route('/books', methods=['POST'])
def add_book():
    new_book = {
        "id": len(books) + 1,
        "title": request.json['title'],
        "author": request.json['author']
    }
    books.append(new_book)
    return jsonify(new_book), 201

# PUT: Обновить книгу
@app.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    book = next((book for book in books if book['id'] == book_id), None)
    if book is None:
        return jsonify({"message": "Книга не найдена"}), 404
    book['title'] = request.json.get('title', book['title'])
    book['author'] = request.json.get('author', book['author'])
    return jsonify(book)

# DELETE: Удалить книгу
@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = next((book for book in books if book['id'] == book_id), None)
    if book is None:
        return jsonify({"message": "Книга не найдена"}), 404
    books.remove(book)
    return jsonify({"message": "Книга удалена"})

if __name__ == '__main__':
    app.run(debug=True)
