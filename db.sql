CREATE TABLE types (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(20));
CREATE TABLE languages (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50)),
CREATE TABLE words (id INT PRIMARY KEY AUTO_INCREMENT, word VARCHAR(20), language_id INT, FOREIGN KEY (language_id) REFERENCES languages(id));
CREATE TABLE words_types (word_id INT, type_id INT, PRIMARY KEY(word_id, type_id), FOREIGN KEY (word_id) REFERENCES words(id), FOREIGN KEY (type_id) REFERENCES types(id));