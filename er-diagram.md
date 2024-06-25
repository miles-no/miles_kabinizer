# Hytte.ro overview

```mermaid
---
title:  ER-diagram of Hytte.ro
---
erDiagram
    Draw {
        int id
        string title
        string description
        boolean specialDrawExcludeLastYearWinners
        boolean reservedForFamiliesWithSchoolchildren
    }
    User {
        int id
        string name
        string email
        string phone
    }
    Day {
        int id
        date date
        int drawId
        int userId
    }
    Interest {
        int id
        int userId
        int dayId
    }

    Draw ||--o{ Day : "Has"
    User ||--o{ Day : "Awarded"
    User ||--o{ Interest : "Has"
    Day ||--o{ Interest : "Has"

```

## Flowchart

```mermaid
---
title: Flowchart of Hytte.ro's page flow
---
flowchart TD
    Login --> CabinLottery
    Login --> AboutCabin[About the Cabin]
    Login --> CheckInOut[Check-in/Check-out]
    Login --> MyCabinTime[My Cabin Time]

    CabinLottery --> DrawParticipation[Participate in Draw]

    AboutCabin --> CabinInfo[Cabin Information]
    AboutCabin --> Location[Location Details]
    AboutCabin --> Amenities[Amenities]

    CheckInOut --> CheckIn[Check In]
    CheckInOut --> CheckOut[Check Out]

    MyCabinTime --> UserProfile[User Profile]
    MyCabinTime --> Bookings[My Bookings]
    MyCabinTime --> Interests[My Interests]
    MyCabinTime --> EditProfile[Edit Profile]
    Bookings --> ViewBookings[View Bookings]
    Bookings --> CancelBooking[Cancel Booking]
    Bookings --> EditBooking[Notify other users about days you don't want to use so that they can book them]
    Interests --> CabinLottery[Add Interest]
    Interests --> CabinLottery[Remove Interest]
```

## Interest vs Booking

Interests are a way to show that you want to use a certain day.
Booking is a day that is awarded to you if you win the draw.



## Relation 
- a draw can contain many days.
- a day can belong to one draw.

- interest can contain one day
- day can belong to one interest

# Tables

- Draw
- DrawDays
- Day
- DayInterests
- Interest
- UserInterests
- User
- UserBookings
- Booking
- BookingDays
