﻿using Application.Dtos;
using Application.Services;
using Common.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentApplicationController : ControllerBase
    {
        private readonly ApplicationService _applicationService;

        public StudentApplicationController(
            ApplicationService applicationService
            )
        {
            _applicationService = applicationService;
        }

        /// <summary>
        /// Get application by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("{id}")]
        [ProducesResponseType<StudentApplicationDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetApplicationById(Guid id)
        {
            return Ok(await _applicationService.GetApplicationMappedAsync(id));
        }

        /// <summary>
        /// Search in all applicationms
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = AccessRights.Deneary)]
        [HttpGet("search")]
        [ProducesResponseType<List<StudentApplicationDto>>(StatusCodes.Status200OK)]
        public async Task<IActionResult> SearchInAll (Guid? studentId, DateTime? from, DateTime? to, bool onlyChecking)
        {
            return Ok(await _applicationService.GetAllApplicationsMappedAsync(studentId, from, to, onlyChecking));
        }

        /// <summary>
        ///  Add attachment
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("{id}/attachment")]
        [ProducesResponseType<Guid>(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddAttachment(Guid id,
            AttachmentUploadDto dto)
        {
            var userId = HttpContext.GetUserId();
            return Ok(await _applicationService.AddAttachment(id, userId.Value, dto));
        }

        /// <summary>
        ///  Get all attachments
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("{id}/attachment")]
        [ProducesResponseType<List<Guid>>(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAttachment(Guid id)
        {
            return Ok(await _applicationService.GetAttachments(id));
        }

        /// <summary>
        /// Create application
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [ProducesResponseType<Guid>(StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateApplication(StudentApplicationCreateUpdateDto dto)
        {
            var userId = HttpContext.GetUserId();

            return Ok(await _applicationService.CreateApplicationAsync(dto, userId.Value));
        }

        /// <summary>
        /// Change existing application
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut]
        [ProducesResponseType<Guid>(StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateApplication(Guid id, StudentApplicationCreateUpdateDto dto)
        {
            var userId = HttpContext.GetUserId();

            return Ok(await _applicationService.UpdateApplicationAsync(id, dto, userId.Value));
        }

        /// <summary>
        /// Delete application
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpDelete]
        [ProducesResponseType<Guid>(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteApplication(Guid id)
        {
            var userId = HttpContext.GetUserId();

            return Ok(await _applicationService.DeleteApplicationAsync(id, userId.Value));
        }

        /// <summary>
        /// Search in yours applications
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [ProducesResponseType<List<StudentApplicationDto>>(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetYoursApplications(DateTime? from, DateTime? to, bool onlyChecking)
        {

            var id = HttpContext.GetUserId();

            return Ok(await _applicationService.GetAllApplicationsMappedAsync(id.Value, from, to, onlyChecking));
        }

        /// <summary>
        /// Change application status
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = AccessRights.Deneary)]
        [HttpPut("{id}/changeStatus")]
        [ProducesResponseType<Guid>(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateApplicationStatus(Guid id, StudentApplicationStatus status)
        {
            return Ok(await _applicationService.ChangeApplicationStatusAsync(id, status));
        }

    }
}
