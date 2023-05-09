using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using TravelAgency.Model.ViewModels.User;
using TravelAgency.Model.ViewModels.User.Response;

namespace TravelAgency.BLL.Intrefaces
{
    public interface IUserService
    {
        Task<AuthentificationResult> CreateAccount(RegisterVM model);
        Task<AuthentificationResult> SignIn(LoginVM model);
        Task SignOut();
        Task<UserVM> FindByEmail(string email);
        Task<UserVM> FindById(string id);
    }
}
