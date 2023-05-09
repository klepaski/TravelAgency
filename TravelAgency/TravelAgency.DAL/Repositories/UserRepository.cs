using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using TravelAgency.DAL.Entities;
using TravelAgency.DAL.Interfaces;

namespace TravelAgency.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<User> _signInManager;

        private const string _userRole = "user";
        private const string _adminRole = "admin";

        public UserRepository(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
        }

        public async Task AddToRole(User user)
        {
            await _userManager.AddToRoleAsync(user, _userRole);
        }


        public async Task<bool> CheckPassword(User user, string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<IdentityResult> CreateAccount(User user, string password)
        {
            IdentityResult result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
            }

            return result;
        }

        public async Task<User> FindByIdUser(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task<User> FindByNameUser(string email)
        {
            return await _userManager.FindByNameAsync(email);
        }

        public async Task<string> GenerateEmailConfirmationToken(User user)
        {
            string code = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            return code;
        }

        public async Task<IEnumerable<string>> GetUserRoles(User user)
        {
            return await _userManager.GetRolesAsync(user);
        }

        public async Task<SignInResult> PasswordSignIn(string email, string password, bool rememberMe, bool flag)
        {
            return await _signInManager.PasswordSignInAsync(email, password, rememberMe, flag);
        }

        public async Task<SignInResult> SignIn(string email, string password, bool rememberMe, bool flag)
        {
            return await _signInManager.PasswordSignInAsync(email, password, rememberMe, flag);
        }

        public Task SignOut()
        {
            return _signInManager.SignOutAsync();
        }

        public async Task<IdentityResult> UpdateProfile(User user)
        {
            return await _userManager.UpdateAsync(user);
        }
    }
}
