# Docker Database

On a M1,M2 etc Mac, make sure Rosetta is enabled... 
```bash
softwareupdate --install-rosetta

```

Then, I would suggest rancher desktop with kubernetes disabled, using the VZ-emulation mode and Rosetta enabled.

```bash

Run the following command to start the database:

```bash
docker-compose up
```

Take note of the password for the `sa` user. It is `"YourStrong!Passw0rd"`.

Tip: use azure data studio to connect to the database and create a new database named `kabinizer`.
https://azure.microsoft.com/en-us/products/data-studio


Then change the connection string in appsettinsg.Development.json to the following:

```json
{
  "ConnectionStrings": {
    "KabinizerConnection": "Server=localhost,1433; Database=kabinizer; User Id=sa; Password=YourStrong!Passw0rd; TrustServerCertificate=true;"
  }
}
```
Then you should be able to run the application and the database will be created and seeded automatically.