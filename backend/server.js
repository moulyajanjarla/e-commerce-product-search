const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({ node: 'http://localhost:9200' });

app.post('/search', async (req, res) => {
  const { query } = req.body;
  const { body } = await client.search({
    index: 'products',
    body: {
      query: {
        multi_match: {
          query,
          fields: ['name', 'description']
        }
      }
    }
  });
  res.send(body.hits.hits.map(hit => hit._source));
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));