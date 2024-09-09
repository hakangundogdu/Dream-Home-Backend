# Real Estate Backend

This is a Node.js backend for a real estate application. It provides RESTful APIs to manage property listings and user interactions, including saving and retrieving favorite properties.

## Features

- Fetch featured properties
- Search properties by city and status
- Retrieve property details by ID
- Save and delete favorite properties for users

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- TypeScript
- CORS for handling cross-origin requests
- dotenv for environment variable management

### API Endpoints

- **GET** `/api/properties/search` - Retrieve properties based on city and status.
- **GET** `/api/properties/:id` - Retrieve a property by its ID.
- **GET** `/api/properties` - Get featured properties.
- **GET** `/api/users/saved/:uid` - Retrieve saved properties for a user.
- **POST** `/api/users/saved` - Save a property to the user's favorites.
- **DELETE** `/api/users/saved` - Remove a property from the user's favorites.

## Frontend

This backend is designed to work with the following frontend repository:

[Real Estate Frontend](https://github.com/hakangundogdu/real-estate-vite)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the contributors and the open-source community for their support.
