using Application.Dtos;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupController : ControllerBase
    {
        private readonly GroupService _groupService;

        public GroupController(
            GroupService groupService
            )
        {
            _groupService = groupService;
        }

        [Authorize]
        [HttpPost("create")]
        [ProducesResponseType<TokenResponseDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> Create(GroupCreateUpdateDto dto)
        {
            return Ok(await _groupService.CreateGroupAsync(dto));
        }

        [Authorize]
        [HttpPut("update")]
        [ProducesResponseType<TokenResponseDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update(Guid id, GroupCreateUpdateDto dto)
        {
            return Ok(await _groupService.GroupEditAsync(id, dto));
        }

        [Authorize]
        [HttpDelete("delete")]
        [ProducesResponseType<UserDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok(await _groupService.GroupDeleteAsync(id));
        }
    }
}
