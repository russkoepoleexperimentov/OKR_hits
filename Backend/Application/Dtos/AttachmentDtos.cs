using Common.Enums;
using Microsoft.AspNetCore.Http;

namespace Application.Dtos
{
    public class AttachmentUploadDto
    {
        public IFormFile File { get; set; } = null!;
    }

    public class AttachmentDto: BaseDto
    {
        public Guid Author {  get; set; }
        public Guid ApplicationId { get; set; }
        public byte[] Data { get; set; } = null!;
        public string ContentType { get; set; } = null!;

    }
}
