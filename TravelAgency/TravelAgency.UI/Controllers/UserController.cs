using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TravelAgency.BLL.Intrefaces;
using TravelAgency.Model.ViewModels.User;
using TravelAgency.Model.ViewModels.User.Response;
using TravelAgency.UI.Contracts;

namespace TravelAgency.UI.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost(RoutesApi.User.CreateAccount)]
        public async Task<IActionResult> CreateAccount([FromForm]RegisterVM model)
        {
            var result = await _userService.CreateAccount(model);

            if (!result.Success)
            {
                return BadRequest(new AuthentificationResult
                {
                    Errors = result.Errors
                });
            }

            return Ok(new AuthentificationResult()
            {
                Errors = new List<string>()
            });
        }

        [HttpPost(RoutesApi.User.Login)]
        public async Task<IActionResult> Login([FromForm]LoginVM model)
        {
            var authResponse = await _userService.SignIn(model);

            if (!authResponse.Success)
            {
                return BadRequest(new AuthentificationResult
                {
                    Errors = authResponse.Errors
                });
            }

            return Ok(new AuthentificationResult
            {
                Errors = new List<string>()
            });
        }

        [HttpPost(RoutesApi.User.LogOut)]
        public async Task Logout()
        {
            await _userService.SignOut();
        }

        [HttpGet(RoutesApi.User.Get)]
        public async Task<IActionResult> GetAccount()
        {
            var email = User.Identity.Name;

            if (email != null)
            {
                var user = await _userService.FindByEmail(email);

                return Ok(new UserVM
                {
                    UserId = user.UserId,
                    Email = user.Email,
                    Roles = user.Roles
                });
            }

            return Ok(new UserVM
            {
                Roles = new List<string>()
            });
        }
    }
}