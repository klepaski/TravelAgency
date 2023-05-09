using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TravelAgency.BLL.Intrefaces;
using TravelAgency.Model.ViewModels.Order;
using TravelAgency.Model.ViewModels.User;
using TravelAgency.UI.Contracts;

namespace TravelAgency.UI.Controllers
{
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IUserService _userService;

        public OrderController(IOrderService orderService, IUserService userService)
        {
            _orderService = orderService;
            _userService = userService;
        }

        [HttpGet(RoutesApi.Order.GetInfo)]
        public async Task<IActionResult> GetInfo(int hotelId)
        {
            var order = await _orderService.GetOrderInfo(hotelId);

            return Ok(order);
        }

        [HttpPost(RoutesApi.Order.Create)]
        public async Task<IActionResult> Create([FromForm]OrderVM model)
        {
            if (ModelState.IsValid)
            {
                string email = User.Identity.Name;

                if (email != null)
                {
                    UserVM user = await _userService.FindByEmail(email);

                    var result = await _orderService.Create(model, user);

                    if (result)
                    {
                        return Ok();
                    }
                }
            }

            return BadRequest();
        }

        [HttpDelete(RoutesApi.Order.Delete)]
        public async Task<IActionResult> Delete(int orderId)
        {
            var result = await _orderService.Cancel(orderId);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpGet(RoutesApi.Order.Get)]
        public async Task<IActionResult> GetAll()
        {
            string email = User.Identity.Name;

            if (email != null)
            {
                UserVM user = await _userService.FindByEmail(email);

                var orders = _orderService.GetOrderByUser(user);

                return Ok(orders);
            }

            return BadRequest();
        }
        //IEnumerable<OrderVM> GetOrderByHotel(UserVM user);
        //Task<bool> Cancel(int orderId);
    }
}