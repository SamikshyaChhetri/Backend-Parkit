# Parkify Backend

This is the backend application for Parkify, a parking management system. The backend is built using Express.js and provides a RESTful API for managing parking spaces, reservations, and users.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/parkify-backend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd parkify-backend
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the server:
   ```sh
   npm start
   ```
2. The server will be running on `http://localhost:3000`.

## API Endpoints

### User Endpoints

- `POST /users/register` - Register a new user
- `POST /users/login` - Login a user

### Parking Endpoints

- `GET /listing` - Get all/listing spaces
- `POST /listing` - Create a new/listing space
- `GET /listing/:id` - Get a specific/listing space
- `PUT /listing/:id` - Update a specific/listing space

### Reservation Endpoints

- `GET /reservations` - Get all reservations
- `POST /reservations` - Create a new reservation
- `GET /reservations/:id` - Get a specific reservation
- `PUT /reservations/:id` - Update a specific reservation
- `DELETE /reservations/:id` - Delete a specific reservation

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Name: Samikshya Baniya Chhetri
Email: samikshyabchhetri@gmail.com
