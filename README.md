# OTT Platform

A comprehensive implementation of an OTT (Over-The-Top) platform using "Nest.JS" for the backend server and "MongoDB" for the database, including Docker support for deployment.

## Folder Structure

- src
  - **common** : Global response interceptor.
  - **config** : Configuration and required secrets for the service.
  - **errors**: Error handling and custom error responses.
  - **health**: Health Check Module to return the running status of the service.
  - **jwt**: JWT Module to generate the token for authenticated users.
  - **my-list** : User's personalized list module
    - **dto** : Data transfer object for API
    - **entities** : Database schema and document.
    - **repository** : Database Model Implementation.
    - **controller** : Routing the requests.
    - **service**: Business logic for managing the user's list.
  - **movies** : Movies Management Module
    - **dto** : Data transfer object for API
    - **entities** : Database schema and document.
    - **repository** : Database Model Implementation.
    - **controller** : Routing the requests.
    - **service**: Business logic for managing movies.
  - **tv-shows** : TV Shows Management Module
    - **dto** : Data transfer object for API
    - **entities** : Database schema and document.
    - **repository** : Database Model Implementation.
    - **controller** : Routing the requests.
    - **service**: Business logic for managing TV shows.
  - **users** : User Management Module
    - **dto** : Data transfer object for API
    - **entities** : Database schema and document.
    - **repository** : Database Model Implementation.
    - **controller** : Routing the requests.
    - **service**: Business logic for managing users.
  - **role**: Role-Based Authentication: PUBLIC, USER, ADMIN
  - **App** : App Module to manage the implementation of all internal modules.
  - **main**: Main module that implements the app server and runs it on a specified port.

## Steps to Start Application
- `docker-compose up` : This command will start the server on any machine using Docker container.
- Visit Swagger Documentation for the APIs: `http://localhost:3000/ott-platform/api`.

## Assumptions Behind the OTT Platform
- Comprehensive logic for managing user lists, movies, and TV shows. It includes functionalities for adding/removing items to/from a user's list, fetching details about movies and TV shows, and managing user information.
- Detailed error handling and logging to ensure issues are properly tracked and communicated.

## Modifications Needed While Deploying to Production
- Health Check 
- Request validation
- CORS Whitelisting
- Logging
- Add Authentication and Authorization
- Perform load testing and create benchmarking.
- Rate Limiting/Throttling: Current limit is 100000 requests per minute.
- Request Size Limit: Add request size limit before moving to production.
- Linter
- Open Tracing and Telemetry: Add tracing and telemetry before moving to production.
- Test Coverage > 95%: Achieve maximum coverage before moving to production.
- Code Refactoring
- Multi-Core Deployment: Deploy code to multi-core systems to handle maximum requests.

### Features That Can Be Integrated Into This Service
- Payment Controller or Third-Party Payment Integration.
- Built-in cart management service.
- If traffic grows, transition the service to microservices architecture.

