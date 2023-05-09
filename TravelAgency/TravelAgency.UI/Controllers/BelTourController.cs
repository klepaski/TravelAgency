using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TravelAgency.BLL.Intrefaces;
using TravelAgency.Model.ViewModels.BelTour;
using TravelAgency.UI.Contracts;

namespace TravelAgency.UI.Controllers
{
    [ApiController]
    public class BelTourController : ControllerBase
    {
        private readonly IBelTourService _belTourService;

        public BelTourController(IBelTourService belTourService)
        {
            _belTourService = belTourService;
        }

        [HttpGet(RoutesApi.BelTour.GetAll)]
        public async Task<IActionResult> GetAll()
        {
            var tours = await _belTourService.GetAll();

            return Ok(tours);
        }

        [HttpGet(RoutesApi.BelTour.GetByPagination)]
        public async Task<IActionResult> GetByPagination(int pageSize, int pageCurrent)
        {
            var tours = await _belTourService.GetTemp(pageSize, pageCurrent);

            var count = await _belTourService.Count();

            return Ok(new object[] { tours, count });
        }

        [HttpGet(RoutesApi.BelTour.Get)]
        public async Task<IActionResult> Get(int belTourId)
        {
            BelTourVM belTour = await _belTourService.GetById(belTourId);

            return Ok(belTour);
        }

        [HttpPost(RoutesApi.BelTour.Create)]
        public async Task<IActionResult> Create([FromForm]BelTourVM model)
        {
            if (ModelState.IsValid)
            {
                var result = await _belTourService.Create(model);

                if (result)
                {
                    return Ok();
                }
            }

            return BadRequest();
        }

        [HttpDelete(RoutesApi.BelTour.Delete)]
        public async Task<IActionResult> Delete(int belTourId)
        {
            var result = await _belTourService.Delete(belTourId);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut(RoutesApi.BelTour.Update)]
        public async Task<IActionResult> Update([FromForm]BelTourVM model)
        {
            if (ModelState.IsValid)
            {
                var result = await _belTourService.Update(model);

                if (result)
                {
                    return Ok();
                }
            }
            return BadRequest();
        }
    }
}