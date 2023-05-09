using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelAgency.BLL.Intrefaces;
using TravelAgency.DAL.Entities;
using TravelAgency.DAL.Interfaces;
using TravelAgency.Model.ViewModels.User;
using TravelAgency.Model.ViewModels.User.Response;

namespace TravelAgency.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<AuthentificationResult> CreateAccount(RegisterVM model)
        {
            var existingUser = await _userRepository.FindByNameUser(model.Email);

            if (existingUser != null)
            {
                return new AuthentificationResult
                {
                    Errors = new[] { "User with this email already exists!" }
                };
            }

            User user = new User { Email = model.Email, UserName = model.Email };

            var result = await _userRepository.CreateAccount(user, model.Password);

            if (!result.Succeeded)
            {
                return new AuthentificationResult
                {
                    Errors = result.Errors
                        .Select(x => x.Description)
                };
            }

            await _userRepository.AddToRole(user);

            var code = await _userRepository.GenerateEmailConfirmationToken(user);

            return new AuthentificationResult
            {
                Success = true,
                Code = code
            };
        }

        public async Task<AuthentificationResult> SignIn(LoginVM model)
        {
            var user = await _userRepository.FindByNameUser(model.Email);

            if (user == null)
            {
                return new AuthentificationResult
                {
                    Errors = new[] { "User does not exist!" }
                };
            }

            var passwordValid = await _userRepository.CheckPassword(user, model.Password);

            if (!passwordValid)
            {
                return new AuthentificationResult
                {
                    Errors = new[] { "User/password combination are wrong!" }
                };
            }

            await _userRepository.SignIn(model.Email, model.Password, model.RememberMe, false);

            return new AuthentificationResult
            {
                Success = true
            };
        }

        public async Task SignOut()
        {
            await _userRepository.SignOut();
        }

        public async Task<UserVM> FindByEmail(string email)
        {
            User user = await _userRepository
                .FindByNameUser(email);

            var roles = await _userRepository.GetUserRoles(user);

            return new UserVM
            {
                UserId = user.Id,
                Email = user.Email,
                Roles = roles                
            };
        }

        public async Task<UserVM> FindById(string id)
        {
            User user = await _userRepository
                  .FindByIdUser(id);

            return new UserVM
            {
                UserId = user.Id,
                Email = user.Email
            };
        }

    }
}
