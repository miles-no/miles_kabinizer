using CsvHelper;
using CsvHelper.Configuration;
using kabinizer_api.Model;
using System.Globalization;
using System.Text;

namespace kabinizer_api.Services.Export;

public static class CsvService
{
    public static byte[] ExportToCsv(IEnumerable<BookingRequest> requests)
    {
        using MemoryStream memoryStream = new();
        using StreamWriter streamWriter = new(memoryStream);
        CsvConfiguration config = new(CultureInfo.CurrentCulture) { Delimiter = ";", Encoding = Encoding.UTF8 };
        using CsvWriter csv = new(streamWriter, config);
        
        csv.WriteRecords(ConvertToCsvRecords(requests));
        streamWriter.Flush();
        return memoryStream.ToArray();
    }

    private static int ConvertDateToWeekNumber(DateOnly date)
    {
        return ISOWeek.GetWeekOfYear(date.ToDateTime(TimeOnly.MinValue));
    }

    private static IEnumerable<CsvRecord> ConvertToCsvRecords(IEnumerable<BookingRequest> bookingRequests)
    {
        return bookingRequests
            .GroupBy(
                req => req.UserId,
                req => "Week x", // TODO: ConvertDateToWeekNumber("Week x"),
                (name, weeks) => new CsvRecord(name.ToString(), string.Join(", ", weeks)));
    }

    private record CsvRecord(string Name, string Weeks);
}