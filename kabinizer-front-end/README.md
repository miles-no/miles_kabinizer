# Kabenizer front-end

## Stack

- Vite
- Typescript
- Tailwind
- react-query
- openapi-typescript-codegen
- msal
- bun
- radix-ui components
  - Generated using v0.dev

## Development

Install packages
`bun install`

Run dev server
`bun run dev`

Generate new openapi types
`bun run generate`

## MVP:

- [x] Login/Logout
- [x] Users can select periods and save.
- [x] Admin can download the data as a CSV.

## TODO

- [ ] Admin can add new periods.
- [ ] Admin can pick a period and see who has signed up.
- [ ] Admin can draw a lottery for a period.

### Nice to have

- [ ] Shopping list.
- [ ] Packing list.
- [ ] Checkin/Checkout system.
  - [ ] Checklist when arriving at the cabin.
  - [ ] Checklist when leaving the cabin.
- [ ] Email notifications.
- [ ] Notify users
- [ ] Allow users to cancel their reservation.

## Bugs

- [ ] Some users have to login twice.

## Types

- **_Periods_** are the available time slots for the cabin that the users can sign up for. They have a start and end date. And they belong to a draw. Most of the time, the period will be from Monday to Sunday, but it can be any period of time. For example the first winter break period starts on the friday before the winter break week.

- **_Draws_** are a set of periods that has a start and end date for when the users can add their desired stay. It also includes a boolean "_isSpecial_" if the draw should be highlighted in the UI. Used for Christmas, Easter, etc.
