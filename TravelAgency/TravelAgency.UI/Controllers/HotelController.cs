using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TravelAgency.BLL.Intrefaces;
using TravelAgency.Model.ViewModels.Hotel;
using TravelAgency.UI.Contracts;

namespace TravelAgency.UI.Controllers
{
    [ApiController]
    //[AutoValidateAntiforgeryToken]
    public class HotelController : ControllerBase
    {
        private readonly IHotelService _hotelService;

        public HotelController(IHotelService hotelService)
        {
            _hotelService = hotelService;
        }


        [HttpGet(RoutesApi.Hotel.GetAll)]
        public async Task<IActionResult> GetAll()
        {
            var hotels = await _hotelService.GetAll();

            return Ok(hotels);
        }

        [HttpGet(RoutesApi.Hotel.GetByPagination)]
        public async Task<IActionResult> GetByPagination(int pageSize, int pageCurrent)
        {
            var hotels = await _hotelService.GetTemp(pageSize, pageCurrent);

            var count = await _hotelService.Count();

            return Ok(new object[] { hotels, count });
        }

        [HttpGet(RoutesApi.Hotel.Get)]
        public async Task<IActionResult> Get(int hotelId)
        {
            HotelVM hotel = await _hotelService.GetById(hotelId);
            if (hotel.HotelId != 0 && hotel.TourId != 0)
            {
                return Ok(hotel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost(RoutesApi.Hotel.Create)]
        public async Task<IActionResult> Create([FromForm]HotelVM model)
        {
            if (ModelState.IsValid)
            {
                var result = await _hotelService.Create(model);

                if (result)
                {
                    return Ok();
                }
            }

            return BadRequest();
        }



        [HttpDelete(RoutesApi.Hotel.Delete)]
        public async Task<IActionResult> Delete(int hotelId)
        {
            var result = await _hotelService.Delete(hotelId);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut(RoutesApi.Hotel.Update)]
        public async Task<IActionResult> Update([FromForm]HotelVM model)
        {
            if (ModelState.IsValid)
            {
                var result = await _hotelService.Update(model);

                if (result)
                {
                    return Ok();
                }
            }
            return BadRequest();
        }
    }
}