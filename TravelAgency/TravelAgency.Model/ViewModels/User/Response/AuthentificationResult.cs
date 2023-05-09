using System.Collections.Generic;

namespace TravelAgency.Model.ViewModels.User.Response
{
    public class AuthentificationResult
    {
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }
        public string Code { get; set; }
    }
}
