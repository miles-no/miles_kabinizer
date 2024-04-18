using CsvHelper;
using CsvHelper.Configuration;
using kabinizer_api.Model;
using System.Globalization;
using System.Text;

namespace kabinizer_api.Services.Export;

public static class CsvService
{
    public static byte[] ExportToCsv(IEnumerable<Model.BookingRequest> requests)
    {
        using MemoryStream memoryStream = new();
        using StreamWriter streamWriter = new(memoryStream);
        CsvConfiguration config = new(CultureInfo.CurrentCulture) { Delimiter = ";", Encoding = Encoding.UTF8 };
        using CsvWriter csv = new(streamWriter, config);
        
        csv.WriteRecords(ConvertToCsvRecords(requests));
        streamWriter.Flush();
        return memoryStream.ToArray();
    }

    private static int ConvertDateToWeekNumber(DateTime date)
    {
        return ISOWeek.GetWeekOfYear(date);
    }

    private static IEnumerable<CsvRecord> ConvertToCsvRecords(IEnumerable<Model.BookingRequest> bookingRequests)
    {
        return bookingRequests
            .GroupBy(
                req => req.User.Name,
                req => ConvertDateToWeekNumber(req.Period.PeriodStart),
                (name, weeks) => new CsvRecord(name.ToString(), string.Join(", ", weeks)));
    }

    private record CsvRecord(string Name, string Weeks);
}