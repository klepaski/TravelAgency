﻿namespace TravelAgency.Model.ViewModels.User
{
    public class LoginVM
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public bool RememberMe { get; set; }

        public string ReturnUrl { get; set; }
    }
}
