using System.Collections.Generic;
using System.Threading.Tasks;
using TravelAgency.Model.ViewModels.Comment;

namespace TravelAgency.BLL.Intrefaces
{
    public interface ICommentService : IBaseService<CommentVM>
    {
        IEnumerable<CommentVM> GetByNotAccess();
        Task<IEnumerable<CommentVM>> GetByTourId(int hotelId);
    }
}
