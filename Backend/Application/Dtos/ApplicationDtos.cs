
using Common.Enums;

namespace Application.Dtos
{
    public class StudentApplicationDto : BaseDto
    {
        public UserDto Author { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public StudentApplicationStatus Status { get; set; }
    }

    public class CsvReportData
    {
        public string? Data { get; set; }
    }

    public class StudentApplicationCreateUpdateDto
    {
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
