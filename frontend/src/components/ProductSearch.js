import React, { useState } from 'react';
import axios from 'axios';

function ProductSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await axios.post('http://localhost:5000/search', { query });
    setResults(res.data);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
      <ul className="mt-4">
        {results.map((item, index) => (
          <li key={index} className="border-b py-2">
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductSearch;