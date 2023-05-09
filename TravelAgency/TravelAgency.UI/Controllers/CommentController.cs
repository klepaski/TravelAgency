using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TravelAgency.BLL.Intrefaces;
using TravelAgency.Model.ViewModels.Comment;
using TravelAgency.UI.Contracts;

namespace TravelAgency.UI.Controllers
{
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ICommentService _commentService;

        public CommentController(IUserService userService, ICommentService commentService)
        {
            _userService = userService;
            _commentService = commentService;
        }

        [HttpPost(RoutesApi.Comment.Create)]
        public async Task<IActionResult> Create([FromForm]CommentVM model)
        {
            if (ModelState.IsValid)
            {
                string email = User.Identity.Name;

                if (email != null)
                {
                    model.Email = email;

                    var result = await _commentService.Create(model);

                    if (result)
                    {
                        return Ok();
                    }
                }
            }

            return BadRequest();
        }

        [HttpGet(RoutesApi.Comment.GetByTour)]
        public async Task<IActionResult> GetByTour(int tourId)
        {
            var tours = _commentService.GetByTourId(tourId);

            return Ok(tours);
        }

        [HttpGet(RoutesApi.Comment.GetNotAccess)]
        public async Task<IActionResult> GetNotAccess()
        {
            var tours = _commentService.GetByNotAccess();

            return Ok(tours);
        }

        [HttpPut(RoutesApi.Comment.Update)]
        public async Task<IActionResult> Update([FromForm]CommentVM model)
        {
            if (ModelState.IsValid)
            {
                string email = User.Identity.Name;

                if (email != null)
                {
                    var result = await _commentService.Update(model);

                    if (result)
                    {
                        return Ok();
                    }
                }
            }

            return BadRequest();
        }

        [HttpDelete(RoutesApi.Comment.Delete)]
        public async Task<IActionResult> Update(int commentId)
        {
            var result = await _commentService.Delete(commentId);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}