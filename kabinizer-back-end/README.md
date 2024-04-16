# Backend

The backend of this project is a controller-based .NET 8 web API, with Entity Framework serving as an object-relational mapper (ORM).

## Database Setup

While you are free to set up the SQL Server database as per your requirements, we have provided a Docker Compose file to simplify the process. This file, located in `helpers/docker-database/docker-compose.yml`, sets up a SQL Server database with predefined configurations.

However, please note that this is just an example setup. You can modify the configurations or set up the SQL Server database manually if you prefer.

### Suggested Tools

To work with the backend, we suggest the following tools:

- A suitable IDE: Visual Studio (with the ASP.NET and web development workload) or Visual Studio Code (+ C# for Visual Studio Code + .NET 8.0 SDK)/Rider
- SQL Server (https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver16)
- SQL Server Management Studio (or similar)

These are not strict requirements, but they can make the development process smoother. Feel free to use the tools that you are most comfortable with.

### Running the whole backend in docker

To get started, simply execute `docker-compose up` from the project's root directory.

```bash
docker-compose up
```

This command will fetch the required images and initiate the application.
Confirm that it's up and running by accessing the Swagger interface at `http://127.0.0.1:8080/swagger`.
