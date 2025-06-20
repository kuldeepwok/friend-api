const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let friends = [
  { id: 1, name: 'taniska', city: 'Delhi' },
  { id: 2, name: 'khushi', city: 'Meerut' },
];

// View All Friends
app.get('/friends', (req, res) => {
  res.send(friends);
});

// Add a New Friend
app.post('/friends', (req, res) => {
  const newFriend = req.body;
  newFriend.id = friends.length + 1;
  friends.push(newFriend);
  res.send({ message: 'Friend added!', newFriend });
});

// Update a Friend
app.put('/friends/:id', (req, res) => {
  const { id } = req.params;
  const updatedInfo = req.body;
  let friend = friends.find(f => f.id == id);
  if (friend) {
    Object.assign(friend, updatedInfo);
    res.send({ message: 'Friend updated!', friend });
  } else {
    res.status(404).send({ message: 'Friend not found!' });
  }
});

// Delete a Friend
app.delete('/friends/:id', (req, res) => {
  const { id } = req.params;
  friends = friends.filter(f => f.id != id);
  res.send({ message: `Friend with ID ${id} deleted` });
});

// Start the server
app.listen(port, () => {
  console.log(`🎉 API running at http://localhost:${port}`);
});