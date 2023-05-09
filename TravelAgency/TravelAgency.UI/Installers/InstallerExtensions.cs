using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using TravelAgency.BLL.Intrefaces;
using TravelAgency.BLL.Services;
using TravelAgency.DAL.Interfaces;
using TravelAgency.DAL.Repositories;

namespace TravelAgency.UI.Installers
{
    public static class InstallerExtensions
    {
        public static void InstallServiceInAssembly(this IServiceCollection services, IConfiguration configuration)
        {
            {
                var installers = typeof(Startup).Assembly.ExportedTypes.Where(x => typeof(IInstaller).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract)
                   .Select(Activator.CreateInstance)
                   .Cast<IInstaller>()
                   .ToList();

                installers.ForEach(installer => installer.InstallServices(services, configuration));

                services.AddTransient<IUserRepository, UserRepository>();
                services.AddTransient<IUserService, UserService>();

                services.AddTransient<IUnitOfWork, UnitOfWork>();
                services.AddTransient<ITourService, TourService>();
                services.AddTransient<IHotelService, HotelService>();
                services.AddTransient<IBelTourService, BelTourService>();

                services.AddTransient<ICommentRepository, CommentRepository>();
                services.AddTransient<ICommentService, CommentService>();

                services.AddTransient<IOrderRepository, OrderRepository>();
                services.AddTransient<IOrderService, OrderService>();
            }
        }
    }
}
