using Application.Dtos;
using Application.Services;
using Common.Enums;
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

        /// <summary>
        /// Get group's users
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("{id}/users")]
        [ProducesResponseType<List<UserDto>>(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUsersByGroupId(Guid id)
        {
            return Ok(await _groupService.GetGroupUsersMappedAsync(id));
        }

        /// <summary>
        /// Get group's info
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("{id}")]
        [ProducesResponseType<GroupDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetGroupById(Guid id)
        {
            return Ok(await _groupService.GetGroupMappedAsync(id));
        }

        /// <summary>
        /// Get group's info
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [ProducesResponseType<List<GroupDto>>(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetGroups()
        {
            return Ok(await _groupService.GetAllGroupsMappedAsync());
        }

        /// <summary>
        /// [Deneary] Create group
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [Authorize(Roles = AccessRights.Deneary)]
        [HttpPost]
        [ProducesResponseType<Guid>(StatusCodes.Status200OK)]
        public async Task<IActionResult> Create(GroupCreateUpdateDto dto)
        {
            return Ok(await _groupService.CreateGroupAsync(dto));
        }

        /// <summary>
        /// [Deneary] Update group
        /// </summary>
        /// <param name="id"></param>
        /// <param name="dto"></param>
        /// <returns></returns>
        [Authorize(Roles = AccessRights.Deneary)]
        [HttpPut]
        [ProducesResponseType<Guid>(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update(Guid id, GroupCreateUpdateDto dto)
        {
            return Ok(await _groupService.GroupEditAsync(id, dto));
        }

        /// <summary>
        /// [Deneary] Delete group
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = AccessRights.Deneary)]
        [HttpDelete]
        [ProducesResponseType<Guid>(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok(await _groupService.GroupDeleteAsync(id));
        }

        /// <summary>
        /// [Deneary] Attach users to a group
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = AccessRights.Deneary)]
        [HttpPost("{id}/users")]
        [ProducesResponseType<Guid>(StatusCodes.Status200OK)]
        public async Task<IActionResult> AttachUsersToAgroup(Guid id, List<Guid> usersId)
        {
            return Ok(await _groupService.AttachStudentsToGroupAsync(id, usersId));
        }
    }
}
