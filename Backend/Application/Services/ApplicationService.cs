﻿using System.Text;
using Application.Dtos;
using Application.Validators;
using AutoMapper;
using Common;
using Common.Enums;
using Common.Exceptions;
using Domain.Entities;
using Domain.Repositories;
using FluentValidation;

namespace Application.Services
{
    public class ApplicationService
    {
        private readonly IStudentApplicationRepository _applicationRepository;
        private readonly IValidator<StudentApplicationCreateUpdateDto> _applicationCreateValidator;
        private readonly IMapper _mapper;
        private readonly UserService _userService;
        private readonly AttachmentService _attachmentService;
        public ApplicationService(IStudentApplicationRepository applicationRepository,
            IMapper mapper,
            IValidator<StudentApplicationCreateUpdateDto> applicationCreateValidator,
            UserService userService, AttachmentService attachmentService)
        {
            _applicationRepository = applicationRepository;
            _applicationCreateValidator = applicationCreateValidator;
            _mapper = mapper;
            _userService = userService;
            _attachmentService = attachmentService;
        }

        public async Task<List<StudentApplicationDto>> GetAllApplicationsMappedAsync(Guid? userId, DateTime? from, DateTime? to, bool onlyOnChecking)
        {
            var applications = await _applicationRepository.Search(userId, from, to, onlyOnChecking);
            return applications.Select(_mapper.Map<StudentApplication, StudentApplicationDto>).ToList();
        }

        public async Task<CsvReportData> MakeReport(Guid? userId, DateTime? from, DateTime? to)
        {
            var applications = await _applicationRepository.Search(userId, from, to, false);

            var csv = new StringBuilder("ApplicationID;Credentials;StudentId;StartDate;EndDate;Status;Created;LastUpdated\n");

            foreach (var application in applications)
            {
                csv.AppendLine(
                        $"{application.Id};" +
                        $"{application.Author.Credentials};" +
                        $"{application.Author.Id};" +
                        $"{application.StartDate};" +
                        $"{application.EndDate};" +
                        $"{application.Status};" +
                        $"{application.CreatedAt};" +
                        $"{application.UpdatedAt}"
                    );
            }

            return new CsvReportData { Data = csv.ToString() };
        }

        public async Task<StudentApplicationDto> GetApplicationMappedAsync(Guid id)
        {
            return _mapper.Map<StudentApplication, StudentApplicationDto > (await GetFromDbAsync(id));
        }

        public async Task<Guid> CreateApplicationAsync(StudentApplicationCreateUpdateDto dto, Guid userId)
        {
            var user = await _userService.GetFromDbAsync(userId);

            await _applicationCreateValidator.ValidateAndThrowAsync(dto);

            var application = _mapper.Map<StudentApplicationCreateUpdateDto, StudentApplication>(dto);

            application.Author = user;

            await _applicationRepository.AddAsync(application);

            return application.Id;

        }


        public async Task<Guid> UpdateApplicationAsync(Guid id, StudentApplicationCreateUpdateDto dto, Guid currentUserId)
        {
            var application = await GetFromDbAsync(id);

            var user = _userService.GetFromDbAsync(currentUserId).Result;

            if (application.Author != user && (user.Role != Role.Deneary && user.Role != Role.Admin))
                throw new ForbiddenException("Forbidden");

            await _applicationCreateValidator.ValidateAndThrowAsync(dto);

            _mapper.Map<StudentApplicationCreateUpdateDto, StudentApplication>(dto, application);

            await _applicationRepository.UpdateAsync(application);

            return application.Id;

        }

        public async Task<Guid> DeleteApplicationAsync (Guid id, Guid currentUserId)
        {
            var application = await GetFromDbAsync(id);

            var user = _userService.GetFromDbAsync(currentUserId).Result;

            if (application.Author != user && (user.Role != Role.Deneary && user.Role != Role.Admin))
                throw new ForbiddenException("Forbidden");

            await _applicationRepository.DeleteAsync(id);

            return id;

        }

        public async Task<Guid> AddAttachment(Guid applicationId,
            Guid userId,
            AttachmentUploadDto dto)
        {
            var application = await GetFromDbAsync(applicationId);

            var user = _userService.GetFromDbAsync(userId).Result;

            var attachmentId = await _attachmentService.AddImageAsync(application, user, dto);

            return attachmentId;
        }

        public async Task<Guid> ChangeApplicationStatusAsync(Guid id, StudentApplicationStatus status) 
        {
            var application = await GetFromDbAsync(id);

            application.Status = status;

            await _applicationRepository.UpdateAsync(application);

            return id;
        }

        internal async Task<StudentApplication> GetFromDbAsync(Guid id)
        {
            var application = await _applicationRepository.GetByIdAsync(id);

            if (application == null)
            {
                throw new NotFoundException("Applicatiion not found");
            }

            return application;
        }

        public async Task<List<Guid>> GetAttachments(Guid id)
        {
            return (await _attachmentService.GetAllByApplicationId(id)).Select(x => x.Id).ToList();
        }
    }

}