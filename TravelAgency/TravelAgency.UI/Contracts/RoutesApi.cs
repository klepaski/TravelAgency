namespace TravelAgency.UI.Contracts
{
    public class RoutesApi
    {
        public const string Root = "api";
        public const string Version = "v1";
        public const string Base = Root + "/" + Version;

        public static class User
        {
            public const string GetAll = Base + "/users";
            public const string CreateAccount = Base + "/users/register";
            public const string Login = Base + "/users/login";
            public const string LogOut = Base + "/users/logout";
            public const string Get = Base + "/users/account";
        }

        public static class Tour
        {
            public const string GetAll = Base + "/tours";
            public const string GetByPagination = Base + "/toursTemp/{pageSize}/{pageCurrent}";
            public const string GetHotToursPagination = Base + "/hotToursTemp/{pageSize}/{pageCurrent}";
            public const string GetHotelsById = Base + "/tourhotelsTemp/{pageSize}/{pageCurrent}/{tourId}";
            public const string Create = Base + "/tours";
            public const string Get = Base + "/tours/{tourId}";
            public const string Update = Base + "/tours";
            public const string Delete = Base + "/tours/{tourId}";
        }

        public static class BelTour
        {
            public const string GetAll = Base + "/belTours";
            public const string GetByPagination = Base + "/belToursTemp/{pageSize}/{pageCurrent}";
            public const string Create = Base + "/belTours";
            public const string Get = Base + "/belTours/{belTourId}";
            public const string Update = Base + "/belTours";
            public const string Delete = Base + "/belTours/{belTourId}";
        }

        public static class Hotel
        {
            public const string GetAll = Base + "/hotels";
            public const string GetByPagination = Base + "/hotelsTemp/{pageSize}/{pageCurrent}";
            public const string Create = Base + "/hotels";
            public const string Get = Base + "/hotels/{hotelId}";
            public const string Update = Base + "/hotels";
            public const string Delete = Base + "/hotels/{hotelId}";
        }

        public static class Order
        {
            public const string GetAll = Base + "/orders";
            public const string Create = Base + "/orders";
            public const string Get = Base + "/orders";
            public const string GetInfo = Base + "/ordersInfo/{hotelId}";
            public const string Delete = Base + "/orders/{orderId}";
        }

        public static class Comment
        {
            public const string GetNotAccess = Base + "/comments";
            public const string Create = Base + "/comments";
            public const string GetByTour = Base + "/comments/{tourId}";
            public const string Update = Base + "/comments";
            public const string Delete = Base + "/comments/{commentId}";
        }

        public static class Images
        {
            public const string Create = Base + "/images";
        }
    }
}
