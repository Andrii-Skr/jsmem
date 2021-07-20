const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 80;

app.get('/add', async (req, res) => {
  console.log(req.query);

  const url = req.query.url;
  const text = req.query.text;

  let image;
  try {
    const response = await fetch(url);

    const buffer = await response.buffer();
    // const type = await fileType.fromBuffer(buffer)

    console.log(buffer);

    image = "data:image/png;base64," + Buffer.from(buffer).toString('base64');
    console.log(image.length);
  }
  catch (e) {
    const message = e.message;
    res.send({message: message});
    return;
  }

  const response = {url, text, image};
  res.send(response);
})

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
