using Application.Dtos;
using Application.Services;
using Common.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(
            UserService userService
            )
        {
            _userService = userService;
        }

        /// <summary>
        /// User registration
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost("register")]
        [ProducesResponseType<TokenResponseDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> Register(UserRegistrationDto dto)
        {
            return Ok(await _userService.RegisterAndGetTokenAsync(dto));
        }

        /// <summary>
        /// User login
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost("login")]
        [ProducesResponseType<TokenResponseDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            return Ok(await _userService.LoginAndGetTokenAsync(dto));
        }

        /// <summary>
        /// Logged in user profile
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("profile")]
        [ProducesResponseType<UserDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetProfile()
        {
            var id = HttpContext.GetUserId();
            return Ok(await _userService.GetMappedAsync(id));
        }

        /// <summary>
        /// Logged in user profile patch
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPatch("profile")]
        [ProducesResponseType<UserDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateProfile(UserUpdateDto dto)
        {
            var id = HttpContext.GetUserId();
            return Ok(await _userService.UpdateAndGetMappedAsync(id, dto));
        }

        /// <summary>
        /// Search users
        /// </summary>
        /// <returns></returns>
        [HttpGet("search")]
        [ProducesResponseType<UserDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> Search(Guid? groupId, string? query)
        {
            return Ok(await _userService.Search(groupId, query));
        }


        /// <summary>
        /// Profile of user with specific Id
        /// </summary>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType<UserDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            return Ok(await _userService.GetMappedAsync(id));
        }

        /// <summary>
        /// [Deneary] Detatch user from a group
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = AccessRights.Deneary)]
        [HttpPost("{id}/detatchGroup")]
        [ProducesResponseType<UserDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> DetachUserFromAgroup(Guid id)
        {
            return Ok(await _userService.DetatchUserFromGroupAsync(id)); 
        }

        /// <summary>
        /// [Admin] Give user deanary role
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = AccessRights.Admin)]
        [HttpPost("{id}/makeDeanary")]
        [ProducesResponseType<Guid>(StatusCodes.Status200OK)]
        public async Task<IActionResult> MakeUserDeanary(Guid id)
        {
            return Ok(await _userService.ChangeUsersRoleAsync(id, Role.Deneary));
        }

        /// <summary>
        /// [Deanary] Give user teacher role
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = AccessRights.Deneary)]
        [HttpPost("{id}/makeTeacher")]
        [ProducesResponseType<Guid>(StatusCodes.Status200OK)]
        public async Task<IActionResult> MakeUserTeacher(Guid id)
        {
            return Ok(await _userService.ChangeUsersRoleAsync(id, Role.Teacher));
        }



    }
}
