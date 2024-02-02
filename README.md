# Assessment Solution

## Description

The assessment consist of two part, which are are Algorithm and Designing a Restaurant Finding API** Using NestJs

## Question 1 - Algorithm

### Description
The sockMerchant function takes an integer n representing the number of socks and an array ar representing the colors of each sock. It calculates and returns the total number of pairs of socks with matching colors.

### Running the Algorithm
```bash
node algorithm/index.js
```

## Question 2 - Designing a Restaurant Finding API** Using NestJs

To use the Restaurant API, follow these steps:

### Installation

- Start by installing NodeJS and npm if you haven't already done so. You can download it from [here](https://nodejs.org/en/).
- Install Docker and Docker compose to use the full functionality of the API . You can download it from [here](https://www.docker.com/).

### Running the app

- Start the project using Docker Compose:
```bash
# development
docker-compose up -d
```

*** PS.
- The project starts in production mode
- The database image that was used in `docker-compose.yml` file has issues with arm64, so it might take some time to install and the application might try few times to connect, PostGis is not full available for Mac M1 chip on Docker hub, But this will solve the distance solution to the assessment. 

### Test
- You can Run tests using the following command:

```bash
# install npm first
npm install

# unit tests
$ npm run test
```

### API Endpoints

#### POST /restaurant
Create new restaurant with name and address. Returns created restaurant object.

Request(application/json): json
- Body
```bash
{
  "name": "Example Restaurant",
  "address": "Example Address",
  "latitude": 40.7128,
  "longitude": -74.006
}
```

Response Status: 201 Created
- Body
```bash
{
  "id": 1,
  "name": "Example Restaurant",
  "address": "Example Address",
  "latitude": 40.7128,
  "longitude": -74.006
}
```

#### GET /restaurants
Get all restaurants. Returns array of restaurant objects.

- Query Parameters:
- - `city` (string): City name (required)
- - `latitude` (number): Latitude of the location (required)
- - `longitude` (number): Longitude of the location (required)
- - `distance` (number): Distance in kilometers (required, must be a positive 

Request:
- Example 
```bash
GET /restaurants?city=ExampleCity&latitude=40.7128&longitude=-74.006&distance=5
```

Response Status: 200 OK
- Body
```bash
{
  "restaurants": [
    {
      "id": 1,
      "name": "Example Restaurant 1",
      "address": "Example Address",
      "latitude": 40.7128,
      "longitude": -74.006
    },
    {
      "id": 2,
      "name": "Example Restaurant 2",
      "address": "Example Address",
      "latitude": 40.7209,
      "longitude": -74.008
    }
    // ... other restaurants
  ]
}
```

#### GET /restaurant/:id
Get one specific restaurant by its id. Returns a single restaurant object if found or an error message otherwise

- Path Parameter:
- - `id` (string): Restaurant ID (required)

Request:
- Example 
```bash
GET /restaurant/1
```

Response Status: 200 OK
- Body
```bash
{
  "id": 1,
  "name": "Example Restaurant",
  "address": "Example Address",
  "latitude": 40.7128,
  "longitude": -74.006
}
```

#### PATCH /restaurant/:id
Update existing restaurant data by its id

- Path Parameter:
- - `id` (string): Restaurant ID (required)

Request:
- Body 
```bash
{
  "name": "Example Restaurant 1",
  "address": "Example Address 1",
  "latitude": 40.7128,
  "longitude": -74.006
}
```

Response Status: 200 OK
- Body
```bash
{
  "id": 1,
  "name": "Example Restaurant 1",
  "address": "Example Address 1",
  "latitude": 40.7128,
  "longitude": -74.006
}
```

#### DELETE /restaurant/:id
Delete a restaurant by its id

- Path Parameter:
- - `id` (string): Restaurant ID (required)

Request:
- Example 
```bash
DELETE /restaurant/1
```

Response Status: 204 No Content

### Error Codes
#### 400 Bad Request:
- Invalid parameters in the request.
  
#### 404 Not Found:
- No restaurants found for the specified criteria.

#### 500 Internal Server Error:
- An unexpected error occurred on the server.

### Support

For more visual details, I have added swagger.
* Access the Swagger documentation at [http://localhost:3000/swagger](http://localhost:3000/swagger) for detailed information about the available endpoints, request parameters, and responses.

