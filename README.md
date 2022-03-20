## NOTES APP

### Idea

This is a backend project for a notes app described below

##### Prerequisites

- [x] Have [**Git**](https://gitforwindows.org/), **[Node.js](https://nodejs.org/en/download/)** and **npm** installed (optional: [nvm](https://github.com/nvm-sh/nvm)).

```cli
mkdir notes-app
cd notes-app
git init
git remote add origin https://github.com/user/repo.git
```

### Back-end

#### Server

we need to install the dependencies included in the generated package.json and start the server:

```bash
npm install
npm start
```

#### Database

1. [Register](https://www.mongodb.com/es/cloud/atlas/register).
2. Create a [Free Cluster](https://docs.atlas.mongodb.com/tutorial/deploy-free-tier-cluster/).
3. Connect with [your cluster](https://docs.atlas.mongodb.com/tutorial/connect-to-your-cluster/).
4. Use mongoose library to connect and query database from our application. mongoose allows you to create models.

##### **Models**

User:

```javascript
{
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
}
```

Notes:

```javascript
{
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}
```

#### API

| HTTP Method | URL   | Description   |
| ----------- | ----- | --------------|
| GET | `api/users` | Route for testing purposes. A user will only have access to his profile. |
| POST | `api/users` | User registration in sign up page. |
| DELETE | `api/users/:id` | User profile deletion. |
| POST | `api/login` | User log in. |
| GET | `api/notes` | Display of all notes available.  |
| GET | `api/notes/:id` | Show details of one specific note. |
| POST | `api/notes` | note creation. |
| PUT | `api/notes/:id` | note edition. |
| DELETE   | `api/notes/:id` | note deletion. |

All routes tested in Postman and REST client.

Authentication created with **JSON Web Tokens** (**JWT**).