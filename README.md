# miles_kabinizer
Kabinizer - Løsning for hyttebooking i Stavanger

## Frontend
Frontend is in React w/ TypeScript.

## Backend
Backend is a controller-based .NET 7 web API.
We are using Entity Framework as an object-relational mapper (ORM).

### Prerequisites
A suitable IDE: Visual Studio (with the ASP.NET and web development workload) or Visual Studio Code (+ C# for Visual Studio Code + .NET 7.0 SDK)/Rider

- SQL Server (https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver16)
- SQL Server Management Studio (or similar)

### HOWTO
Run ef core migrations with:
```
update database
```
on default project: kabinizer-data

This will add the tables and columns necessary for running the solution
