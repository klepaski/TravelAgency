using System.Collections.Generic;

namespace TravelAgency.Model.ViewModels.User
{
    public class UserVM
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}
