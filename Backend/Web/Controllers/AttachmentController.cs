using Application.Dtos;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttachmentController : ControllerBase
    {
        private readonly AttachmentService _attachmentService;

        public AttachmentController(
            AttachmentService attachmentService
            )
        {
            _attachmentService = attachmentService;
        }

        /// <summary>
        /// Get attachment by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("{id}")]
        [ProducesResponseType<List<UserDto>>(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUsersByGroupId(Guid id)
        {
            return Ok(await _attachmentService.GetAttachmentById(id));
        }
    }
}