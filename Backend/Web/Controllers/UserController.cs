using Application.Dtos;
using Application.Services;
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

        [HttpPost("register")]
        [ProducesResponseType<TokenResponseDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> Register(UserRegistrationDto dto)
        {
            return Ok(await _userService.RegisterAndGetTokenAsync(dto));
        }


        [HttpPost("login")]
        [ProducesResponseType<TokenResponseDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            return Ok(await _userService.LoginAndGetTokenAsync(dto));
        }

        [Authorize]
        [HttpGet("profile")]
        [ProducesResponseType<UserDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetProfile()
        {
            var id = HttpContext.GetUserId();
            return Ok(await _userService.GetMappedAsync(id));
        }

        [Authorize]
        [HttpPatch("profile")]
        [ProducesResponseType<UserDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateProfile(UserUpdateDto dto)
        {
            var id = HttpContext.GetUserId();
            return Ok(await _userService.UpdateAndGetMappedAsync(id, dto));
        }

        [HttpGet("{id}")]
        [ProducesResponseType<UserDto>(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            return Ok(await _userService.GetMappedAsync(id));
        }
    }
}
