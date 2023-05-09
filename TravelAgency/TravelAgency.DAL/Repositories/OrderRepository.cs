using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelAgency.DAL.Context;
using TravelAgency.DAL.Entities;
using TravelAgency.DAL.Interfaces;

namespace TravelAgency.DAL.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DatabaseContext _context;

        public OrderRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<bool> Cancel(Orderr entity)
        {
            _context.Orderrs
                .Remove(entity);

            int deleted = await _context.SaveChangesAsync();

            return deleted > 0;
        }

        public async Task<bool> Create(Orderr entity)
        {
             _context.Orderrs
                .Add(entity);

            int created = await _context.SaveChangesAsync();

            return created > 0;
        }

        public Orderr GetById(int hotelId)
        {
            return _context.Orderrs
                .Find(hotelId);
        }

        public IEnumerable<Orderr> GetOrderByUser(string userId)
        {
            return _context.Orderrs
                .Where(x => x.UserId == userId);
        }
    }
}
