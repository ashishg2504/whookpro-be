# Webhook Management System

This project is a full-stack application for managing webhooks, including user authentication, webhook subscription, and event handling. The backend is built using Express.js, and the frontend is developed with React.js.

## Installation

### Express Server

1. Install
2. Create .env
3. Paste content of env file share in .env
4. npm install --force
5. node server.js

### Script

1. Run Script
2. node script/index.js

## Architecture

- Express.js: Chosen for its simplicity and flexibility in building RESTful APIs.
- MongoDB: Used for storing user data, webhooks, and events.
- JWT: Utilized for secure authentication and authorization.
- UUID: Used for generating unique identifiers for Callback URL.
- Bcrypt: Utilized for hashing and securely storing user passwords.

## Design

#### User Authentication

- Implemented using JWT to securely authenticate users and manage sessions. This ensures that only authenticated users can subscribe to and manage

#### Webhook Subscription and Event Handling

- Users can subscribe to webhooks by providing a source URL and a callback URL. Events received from the source URL are filtered, processed, and forwarded to the callback URL.

#### Dashboard

- A user-friendly dashboard is provided to view and manage subscribed webhooks and events. This improves the user experience and simplifies webhook management.
