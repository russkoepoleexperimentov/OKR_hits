using Application.Dtos;
using AutoMapper;
using Common.Enums;
using Common.Exceptions;
using Domain.Entities;
using Domain.Repositories;

namespace Application.Services
{


    public class AttachmentService
    {

        public static string DirectoryPath = "uploaded";

        private readonly IAttachmentRepository _attachmentRepository;
        private readonly IMapper _mapper;
        public AttachmentService(IAttachmentRepository attachmentRepository,
            IMapper mapper,
            UserService userService)
        {
            _attachmentRepository = attachmentRepository;
            _mapper = mapper;
        }


        public async Task<AttachmentDto> GetAttachmentById(Guid id)
        {
            var attachment = await GetFromDbAsync(id);

            var data = await File.ReadAllBytesAsync(attachment.Path);

            return new()
            { 
                Data = data,
                ContentType = attachment.ContentType!
            };
        }

        private async Task<Attachment> UploadAndGetAsync(User author, AttachmentUploadDto dto, StudentApplication application)
        {
            var path = "/app/images";

            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            if (dto.File.ContentType.Contains("image") == false)
                throw new BadRequestException("Please, upload an image");

            var attachment = new Attachment();

            attachment.Author = author;
            attachment.Application = application;
            attachment.ContentType = dto.File.ContentType;
            attachment.Path = "undefined";
            await _attachmentRepository.AddAsync(attachment);

            path = Path.Combine(path, attachment.Id.ToString() + "_" + dto.File.FileName);

            using (FileStream stream = File.OpenWrite(path))
            {
                await dto.File.CopyToAsync(stream);
            }

            attachment.Path = path;
            await _attachmentRepository.UpdateAsync(attachment);

            return attachment;
        }


        public async Task<Guid> AddImageAsync(
            StudentApplication application,
            User user,
            AttachmentUploadDto dto
        )
        {

            if (application.Author != user && (user.Role != Role.Deneary && user.Role != Role.Admin))
                throw new ForbiddenException("Forbidden");

            var image = await UploadAndGetAsync(user, dto, application);

            image.Author = user;

            image.Application = application;

            await _attachmentRepository.UpdateAsync(image);

            return image.Id;
        }

        public async Task<List<Attachment>> GetAllByApplicationId(Guid id)
        {
            return await _attachmentRepository.FindByApplicationId(id);
        }



        internal async Task<Attachment> GetFromDbAsync(Guid id)
        {
            var attachment = await _attachmentRepository.GetByIdAsync(id);

            if (attachment == null)
            {
                throw new NotFoundException("attachment not found");
            }

            return attachment;
        }




    }

}