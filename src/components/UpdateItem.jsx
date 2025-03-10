import React, { useState, useEffect } from 'react';

const UpdateItem = () => {
  const [item, setItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState('');
  const [response, setResponse] = useState(null);
  const API_URI = 'your_api_uri_here'; // Replace with actual API URI

  useEffect(() => {
    // Fetch existing item when component mounts
    fetch(API_URI)
      .then(response => response.json())
      .then(data => setItem(data))
      .catch(error => console.error('Error fetching item:', error));
  }, []);

  const handleInputChange = (event) => {
    setUpdatedItem(event.target.value);
  };

  const handleUpdate = () => {
    // Make PUT or PATCH request to update the item
    fetch(API_URI, {
      method: 'PUT', // or 'PATCH'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...item, updatedField: updatedItem }), // Adjust according to your API
    })
      .then(response => response.json())
      .then(data => setResponse(data))
      .catch(error => console.error('Error updating item:', error));
  };

  return (
    <div>
      {item && (
        <div>
          <h2>Existing Item</h2>
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </div>
      )}
      <div>
        <h2>Update Item</h2>
        <input type="text" value={updatedItem} onChange={handleInputChange} />
        <button onClick={handleUpdate}>Update</button>
      </div>
      {response && (
        <div>
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UpdateItem;