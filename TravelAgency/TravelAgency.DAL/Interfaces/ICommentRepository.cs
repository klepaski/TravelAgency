using System.Collections.Generic;
using System.Threading.Tasks;
using TravelAgency.DAL.Entities;

namespace TravelAgency.DAL.Interfaces
{
    public interface ICommentRepository 
    {
        IEnumerable<Comment> GetByTour(int tourId);
        IEnumerable<Comment> GetByNotAccess();
        Comment Get(int commentId);
        Task<bool> Create(Comment entity);
        Task<bool> Update(Comment entity);
        Task<bool> Delete(Comment entity);
    }
}
