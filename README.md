# Animal Rescue Community

Welcome to the **Animal Rescue Community** project! This web application is designed to assist in the adoption of animals, manage donations, and track expenses. The goal is to provide a platform where people can help animals in need.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Database Schema](#database-schema)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

## Overview

Animal Rescue Community is a platform for animal rescue organizations to manage their activities. It includes features for listing animals available for adoption, recording donations, and tracking expenses.

## Features

- **User Management**: Register and manage users with different roles (Admin, Volunteer).
- **Animal Listings**: Add, update, and view animals available for adoption.
- **Adoptions**: Process and track adoption requests.
- **Donations**: Record donations and manage donation proofs.
- **Expenses**: Track and manage expenses related to animal care.

## Technologies Used

- **Backend**: Java, Spring Boot
- **Frontend**: React
- **Database**: MySQL
- **Build Tool**: Maven
- **Other Tools**: Docker, Git, Jenkins, Postman, Swagger

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/Akash-Bharambe/animal-rescue-community.git
   cd animal-rescue-community
   ```

2. **Backend Setup**:

   - Ensure you have JDK 17 or higher installed.
   - Navigate to the `backend` directory and run:

   ```sh
   mvn clean install
   mvn spring-boot:run
   ```

3. **Frontend Setup**:

   - Ensure you have Node.js installed.
   - Navigate to the `frontend` directory and run:

   ```sh
   npm install
   npm start
   ```

4. **Database Setup**:

   - Ensure MySQL is installed and running.
   - Create a database named `animal_rescue_db` and run the SQL scripts in the `db` directory to set up the schema.

## Usage

- Access the application at `http://localhost:3000` after running both the backend and frontend servers.
- Admins can manage users, animals, adoptions, donations, and expenses.
- Volunteers can view and manage animal details and adoption requests.

## Database Schema

The database schema consists of the following tables:

- **Users**: Stores user information.
- **Animals**: Stores information about animals.
- **Adoptions**: Tracks adoption requests and statuses.
- **Donations**: Records donation details.
- **Expenses**: Tracks expenses related to the organization.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with a descriptive message.
4. Push your changes to your fork.
5. Open a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For questions or inquiries, please contact [ARC PUNE](https://github.com/ARCPUNE), [Sahil Kamble](https://github.com/thesahilkamble), [Akash Bharambe](https://github.com/Akash-Bharambe).
