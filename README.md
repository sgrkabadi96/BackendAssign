# Event Management API

## Description

The Event Management API is a backend service designed for managing events and their parameters. Built with Node.js, Express, and MongoDB, this API provides endpoints to create events, retrieve event parameters, and get specific parameter types.

## Features

- **Create Events**: Add a list of events to the MongoDB database.
- **Retrieve Event Parameters**: Get the parameters of a specific event.
- **Get Parameter Type**: Retrieve the type of a specific parameter for an event.

## Installation

1. **Clone the Repository**

   ```
   git clone https://github.com/sgrkabadi96/BackendAssign.git
   cd BackendAssign
   ```


2. **Install Dependencies**

   ```
   npm install
   ```


3. **Set Up Environment Variables**

Create a `.env` file in the root directory of the project with the following content:


   ```
   MONGO_URI = add your mongo url
   PORT = add the port number you want to start at
   ```

4. **Start the Server**

- For development with auto-reloading:

  ```
  npm run dev
  ```

- For production:

  ```
  npm run start OR npm start
  ```

The server will run at `http://localhost:5000`.

## API Endpoints

### 1. **Create Events**

- **Method**: `POST`
- **Endpoint**: `/api/events`
- **Description**: Create a list of events.
- **Request Body**: An array of event objects, each containing `name` and `parameters`.
- **Example Request**:

```
[ 
   { 
      "name": "UpdatePriceInReplica",
      "parameters": [
       { "name": "price", "type": "float" }, 
       { "name": "id", "type": "int" }
     ]
   } 
]
```

- **Responses**:
- **201 Created**:

  ```
  {
    "message": "Events created successfully",
    "data": [...]
  }
  ```
- **400 Bad Request**: For invalid input or duplicate event names.

### 2. **Get Event Parameters**

- **Method**: `GET`
- **Endpoint**: `/api/events/:eventName/parameters`
- **Description**: Retrieve parameters of a specific event.
- **URL Parameter**: `eventName` (name of the event)
- **Example Request**: `GET /api/events/CreateUser/parameters`
- **Responses**:
- **200 OK**:

  ```
  [
    { "name": "user", "type": "string" }
  ]
  ```
- **404 Not Found**: If the event does not exist.

### 3. **Get Parameter Type**

- **Method**: `GET`
- **Endpoint**: `/api/events/:eventName/parameters?paramName=parameterName`
- **Description**: Retrieve the type of a specific parameter for an event.
- **URL Parameter**: `eventName` (name of the event)
- **Query Parameter**: `paramName` (name of the parameter)
- **Example Request**: `GET /api/events/CreateUser/parameters?paramName=user`
- **Responses**:
- **200 OK**:

  ```
  { "type": "string" }
  ```
- **404 Not Found**: If the event or parameter does not exist.

## Error Handling

- **404 Not Found**: For invalid routes or non-existent events/parameters.
- **400 Bad Request**: For invalid data or duplicate events.
- **500 Internal Server Error**: For unexpected server issues.

## Using Docker Compose:

Make sure you have Docker installed. Then, use the following command to build and start the application:

```
docker compose up
```

This will start the application and MongoDB in Docker containers as specified in the docker-compose.yml file.



