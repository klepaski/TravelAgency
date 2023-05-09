using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TravelAgency.BLL.Intrefaces;
using TravelAgency.Model.ViewModels.Tour;
using TravelAgency.UI.Contracts;

namespace TravelAgency.UI.Controllers
{
    [ApiController]
    public class TourController : ControllerBase
    {
        private readonly ITourService _tourService;

        public TourController(ITourService tourService)
        {
            _tourService = tourService;
        }

        [HttpGet(RoutesApi.Tour.GetAll)]
        public async Task<IActionResult> GetAll()
        {
            var tours = await _tourService.GetAll();

            return Ok(tours);
        }

        [HttpGet(RoutesApi.Tour.GetByPagination)]
        public async Task<IActionResult> GetByPagination(int pageSize, int pageCurrent)
        {
            var tours = await _tourService.GetTemp(pageSize, pageCurrent);

            var count = await _tourService.Count();

            return Ok(new object[] { tours, count });
        }

        [HttpGet(RoutesApi.Tour.GetHotToursPagination)]
        public async Task<IActionResult> GetHotToursPagination(int pageSize, int pageCurrent)
        {
            var tours = await _tourService.GetHotToursPagination(pageSize, pageCurrent);

            var count = await _tourService.Count();

            return Ok(new object[] { tours, count });
        }

        [HttpGet(RoutesApi.Tour.GetHotelsById)]
        public async Task<IActionResult> GetHotelsById(int pageSize, int pageCurrent, int tourId)
        {
            var tours = await _tourService.GetHotelsById(pageSize, pageCurrent, tourId);

            var count = await _tourService.CountHotelsById(tourId);

            return Ok(new object[] { tours, count });
        }

        [HttpGet(RoutesApi.Tour.Get)]
        public async Task<IActionResult> Get(int tourId)
        {
            TourVM tour = await _tourService.GetById(tourId);

            return Ok(tour);
        }

        [HttpPost(RoutesApi.Tour.Create)]
       // [Authorize(Roles ="admin")]
        public async Task<IActionResult> Create([FromForm]TourVM model)
        {
            if (ModelState.IsValid)
            {
                var result = await _tourService.Create(model);

                if (result)
                {
                    return Ok();
                }
            }

            return BadRequest();
        }

        [HttpDelete(RoutesApi.Tour.Delete)]
        public async Task<IActionResult> Delete(int tourId)
        {
            var result = await _tourService.Delete(tourId);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut(RoutesApi.Tour.Update)]
        public async Task<IActionResult> Update([FromForm]TourVM model)
        {
            if (ModelState.IsValid)
            {
                var result = await _tourService.Update(model);

                if (result)
                {
                    return Ok();
                }
            }

            return BadRequest();
        }
    }
}