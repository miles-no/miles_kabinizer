import { useState } from "react";
import { useQuery } from "react-query";

const fetchBookings =
  async () // year: string | number = new Date().getFullYear(),
  : Promise<
    {
      week: number;
      bookedBy: string;
      interested: string[];
      drawDeadline: string;
      drawTitle: string;
      isSpecial: boolean;
    }[]
  > => {
    // let's mock some data
    return Array.from({ length: 52 }, (_, i) => ({
      week: i + 1,
      bookedBy: "John Doe",
      interested: ["Jane Doe", "Alice Doe"],
      drawDeadline: "2024-01-01",
      drawTitle: "New Year's Eve",
      isSpecial: i % 2 === 0,
    }));
  };

const BookingTable = () => {
  const [year, setYear] = useState(2024);
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery(["bookings", year], () => fetchBookings(), {
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // data stays in cache for 30 minutes
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + JSON.stringify(error);

  return (
    <div>
      <h1>Booking Overview</h1>
      <p>This page shows the overview of bookings for a given year.</p>
      <div>
        <label htmlFor="year">Select year</label>
        <input
          id="year"
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Booked by</th>
            <th>Interested</th>
            <th>Draw deadline</th>
            <th>Draw title</th>
            <th>Special draw?</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking) => (
            <tr key={booking.week}>
              <td>{booking.week}</td>
              <td>{booking.bookedBy}</td>
              {/*<td>{booking.interested.join(", ")}</td>*/}
              <td>{booking.drawDeadline}</td>
              <td>{booking.drawTitle}</td>
              <td>{booking.isSpecial ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
