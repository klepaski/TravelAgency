using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using TravelAgency.DAL.Entities;

namespace TravelAgency.DAL.Interfaces
{
    public interface IUserRepository
    {
        Task<IdentityResult> CreateAccount(User user, string password);
        Task<SignInResult> SignIn(string email, string password, bool rememberMe, bool flag);
        Task SignOut();
        Task<User> FindByIdUser(string id);
        Task<User> FindByNameUser(string email);
        Task AddToRole(User user);
        Task<bool> CheckPassword(User user, string password);
        Task<SignInResult> PasswordSignIn(string email, string password, bool rememberMe, bool flag);
        Task<string> GenerateEmailConfirmationToken(User user);
        Task<IdentityResult> UpdateProfile(User user);
        Task<IEnumerable<string>> GetUserRoles(User user);
    }
}
