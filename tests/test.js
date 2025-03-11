const axios = require('axios');
const { loremIpsum } = require('lorem-ipsum');

// Генерируем текст
const generatedText = loremIpsum({
	count: 1, // Количество абзацев
	units: 'paragraphs', // Единица измерения (paragraphs, sentences, words)
	sentenceLowerBound: 5, // Минимальное количество предложений в абзаце
	sentenceUpperBound: 20, // Максимальное количество предложений в абзаце
});

axios
	.post('http://localhost:3000/items', {
		title: 'New Item',
		body: generatedText,
	})
	.then(response => console.log(response.data))
	.catch(error => console.error(error));

axios
	.get('http://localhost:3000/items')
	.then(response => console.log(response.data))
	.catch(error => console.error(error));

axios
	.get('http://localhost:3000/items/1')
	.then(response => console.log(response.data))
	.catch(error => console.error(error));

// axios
// 	.get('http://localhost:3000/items/99999')
// 	.then(response => console.log(response.data))
// 	.catch(error => console.error(error));

// axios
// 	.put('http://localhost:3000/items/1', {
// 		title: 'Edited Item',
// 		body: 'Edited item content',
// 	})
// 	.then(response => console.log(response.status))
// 	.catch(error => console.error(error));
