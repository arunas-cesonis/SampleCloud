const express = require('express');
const app = express();

app.get('/home', (req, res) => {
	var obj = {
		test: 'Test',
		arg2: 'arg2'
	}
	res.send(obj);
});
app.listen(3010, () => {
	console.log('Server has started.');
});

