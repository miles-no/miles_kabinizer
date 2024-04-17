# Kabinizer: Your Cabin Booking Solution

Welcome to Kabinizer, a comprehensive solution for cabin booking based in Stavanger. This project is designed to streamline the process of booking and managing cabin reservations, making it easier for both administrators and users.

## Frontend
[![Build and deploy Node.js app to Azure Web App - app-kabinizer-client-dev](https://github.com/miles-no/miles_kabinizer/actions/workflows/main_app-kabinizer-client-dev.yml/badge.svg)](https://github.com/miles-no/miles_kabinizer/actions/workflows/main_app-kabinizer-client-dev.yml)

Our frontend is built with React and TypeScript, providing a robust and dynamic user interface. It includes features such as user login/logout, period selection and saving, and data download for admins. Future enhancements include the addition of new periods by admins, a lottery system for period selection, and a variety of user-friendly features like shopping lists, check-in/check-out systems, and email notifications.

For more details, please refer to the [kabinizer-front-end](kabinizer-front-end/README.md) documentation.

## Backend
[![Build and deploy ASP.Net Core app to Azure Web App - app-kabinizer-dev](https://github.com/miles-no/miles_kabinizer/actions/workflows/main_app-kabinizer-dev.yml/badge.svg)](https://github.com/miles-no/miles_kabinizer/actions/workflows/main_app-kabinizer-dev.yml)

The backend of Kabinizer is a controller-based .NET 8 web API, utilizing Entity Framework as an object-relational mapper (ORM). It includes a Docker Compose file for setting up a SQL Server database, making it easy to manage and access data.

For more information, please see the [kabinizer-back-end](kabinizer-back-end/README.md) documentation.
