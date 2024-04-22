# Kabinizer: Your Cabin Booking Solution

Welcome to Kabinizer, a comprehensive solution for cabin booking based in Stavanger. This project is designed to
streamline the process of booking and managing cabin reservations, making it easier for both administrators and users.

Before you get started, please review the overview and architecture of the system. 

If you have any questions or need assistance, please don't hesitate to reach out to the project team on Slack or
email [kabinizer-support-aaaamw5kclgfndz6ufcdnfxbfq@miles-no.slack.com](mailto:kabinizer-support-aaaamw5kclgfndz6ufcdnfxbfq@miles-no.slack.com).

## System Overview and Architecture

Kabinizer's main aim is to organize cabin raffles in the Stavanger area. Users can request a specific period, and once
the deadline is reached, the system randomly picks a user to be awarded that period.

The system is designed with administrators in mind, making it easy for them to keep track of requests and allocations.

> Please note that the first version of the system won't support automatic draws. This feature will be added in a later
version. For now, the admin will have to draw the winner manually.

Here's a simple "ER" -ish diagram of the system to help you get a grip on the system's terminology and structure.

```mermaid
---
title: ER-ish diagram of Kabinizer (In theory how the system should work)
---
erDiagram
    Draw {
        string Title "Title of the draw. E.g. 'Summer 2022'"
        date Deadline "Deadline for requests. After this, the system will draw a winner, and no further requests are allowed"
        boolean isSpecial "Special rules apply"
    }
    Period {
        date From "Date From"
        date To "Date To"
        string title "optional"
    }
    BookingRequest {
        date Requested "When the request was made"
        boolean approved "The system or an admin has approved the request"
        boolean withdrawn "User has withdrawn request"
    }
    Draw ||--|{ Period: Contains
    BookingRequest ||--|{ Period: "Request one or multiple"
    Admin ||--|{ Draw: Creates
    User ||--|{ BookingRequest: "Creates or deletes"
    Admin ||--|{ BookingRequest: "Approves or denies"
```

## Frontend

[![Build and deploy Node.js app to Azure Web App - app-kabinizer-client-dev](https://github.com/miles-no/miles_kabinizer/actions/workflows/main_app-kabinizer-client-dev.yml/badge.svg)](https://github.com/miles-no/miles_kabinizer/actions/workflows/main_app-kabinizer-client-dev.yml)

Our front end is built with React and TypeScript, providing a robust and dynamic user interface. It includes features
such as user login/logout, period selection, saving, and data download for admins. Future enhancements include the
addition of new periods by admins, a lottery system for period selection, and a variety of user-friendly features like
shopping lists, check-in/check-out systems, and email notifications.

For more details, please refer to the [kabinizer-front-end](kabinizer-front-end/README.md) documentation.

## Backend

[![Build and deploy ASP.Net Core app to Azure Web App - app-kabinizer-dev](https://github.com/miles-no/miles_kabinizer/actions/workflows/main_app-kabinizer-dev.yml/badge.svg)](https://github.com/miles-no/miles_kabinizer/actions/workflows/main_app-kabinizer-dev.yml)

The backend of Kabinizer is a controller-based .NET 8 web API, utilizing Entity Framework as an object-relational
mapper (ORM). It includes a Docker Compose file for setting up an SQL Server database, making it easy to manage and
access data.

For more information, please see the [kabinizer-back-end](kabinizer-back-end/README.md) documentation.

