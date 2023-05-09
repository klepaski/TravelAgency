using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace TravelAgency.DAL.Entities
{
    public class User : IdentityUser
    {
        public User()
        {
            Orders = new HashSet<Orderr>();
            Comments = new HashSet<Comment>();
        }

        public virtual ICollection<Orderr> Orders { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
