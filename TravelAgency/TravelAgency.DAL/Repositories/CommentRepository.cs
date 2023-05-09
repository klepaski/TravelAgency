using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelAgency.DAL.Context;
using TravelAgency.DAL.Entities;
using TravelAgency.DAL.Interfaces;

namespace TravelAgency.DAL.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly DatabaseContext _context;

        public CommentRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<bool> Create(Comment entity)
        {
            await _context.Comments
                .AddAsync(entity);

            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<bool> Delete(Comment entity)
        {
            _context.Comments
               .Remove(entity);

            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public Comment Get(int commentId)
        {
            return _context.Comments
                .Find(commentId);
        }

        public IEnumerable<Comment> GetByNotAccess()
        {
            return _context.Comments
             .Where(x => x.IsRight == false);
        }

        public IEnumerable<Comment> GetByTour(int tourId)
        {
            return _context.Comments
                .Where(x => x.TourId == tourId && x.IsRight == true);
        }

        public async Task<bool> Update(Comment entity)
        {
            _context.Comments
                 .Update(entity);

            var result = await _context.SaveChangesAsync();

            return result > 0;
        }
    }
}
