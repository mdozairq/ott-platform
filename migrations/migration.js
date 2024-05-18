const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'ott-db';

// JSON file paths
const userFilePath = path.join(__dirname, 'users.json');
const tvShowFilePath = path.join(__dirname, 'tvshows.json');
const movieFilePath = path.join(__dirname, 'movies.json');
const myListFilePath = path.join(__dirname, 'myLists.json');

// Read JSON files
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));
const tvShows = JSON.parse(fs.readFileSync(tvShowFilePath, 'utf8'));
const movies = JSON.parse(fs.readFileSync(movieFilePath, 'utf8'));
const myLists = JSON.parse(fs.readFileSync(myListFilePath, 'utf8'));

async function migrate() {
  // Use connect method to connect to the server
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    // Drop existing collections if they exist
    await db.collection('users').drop().catch(() => console.log('users collection does not exist.'));
    await db.collection('tvshows').drop().catch(() => console.log('tvshows collection does not exist.'));
    await db.collection('movies').drop().catch(() => console.log('movies collection does not exist.'));
    await db.collection('my_lists').drop().catch(() => console.log('my_lists collection does not exist.'));

    // Insert data into collections
    await db.collection('users').insertMany(users);
    await db.collection('tvshows').insertMany(tvShows);
    await db.collection('movies').insertMany(movies);
    await db.collection('my_lists').insertMany(myLists);

    console.log('Data migration completed successfully');
  } catch (err) {
    console.error('Error migrating data:', err);
  } finally {
    await client.close();
  }
}

migrate();
