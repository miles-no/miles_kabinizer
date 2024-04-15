# Docker Database Setup for Kabinizer Project

This document provides instructions for setting up a Docker-based SQL Server database for the Kabinizer project.

## Prerequisites

For developers using M1, M2, etc. Macs, ensure that Rosetta is enabled. You can do this by running the following command:

```bash
softwareupdate --install-rosetta
```

It is recommended to use Rancher Desktop with Kubernetes disabled, using the VZ-emulation mode and Rosetta enabled.

## Starting the Database

To start the database, run the following command:

```bash
docker-compose up
```

Please remember the password for the `sa` user, which is `"YourStrong!Passw0rd"`.

## Connecting to the Database

You can use Azure Data Studio to connect to the database and create a new database named `kabinizer`. You can download Azure Data Studio from [here](https://azure.microsoft.com/en-us/products/data-studio).

## Updating the Connection String

After setting up the database, update the connection string in `appsettings.Development.json` as follows:

```json
{
  "ConnectionStrings": {
    "KabinizerConnection": "Server=localhost,1433; Database=kabinizer; User Id=sa; Password=YourStrong!Passw0rd; TrustServerCertificate=true;"
  }
}
```

## Running the Application
With these settings, you should be able to run the application, and the database will be created with the appropriate tables.
