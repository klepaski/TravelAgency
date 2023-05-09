using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelAgency.DAL.Context;
using TravelAgency.DAL.Interfaces;

namespace TravelAgency.DAL.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T>
            where T : class
    {
        private DatabaseContext _context { get; set; }

        public BaseRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _context.Set<T>()
                .ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await _context.Set<T>()
                .FindAsync(id);
        }

        public async Task<bool> Create(T entity)
        {
            await _context.Set<T>()
                .AddAsync(entity);

            int created = await _context.SaveChangesAsync();

            return created > 0;
        }

        public async Task<bool> Update(T entity)
        {
            _context.Set<T>()
                .Update(entity);

            int updated = await _context.SaveChangesAsync();

            return updated > 0;
        }

        public async Task<bool> Delete(T entity)
        {
            _context.Set<T>()
                .Remove(entity);

            int deleted = await _context.SaveChangesAsync();

            return deleted > 0;
        }

        public async Task<int> Count()
        {
            return await _context.Set<T>()
                .CountAsync();
        }

        public async Task<IEnumerable<T>> GetByPagination(int sizePage, int currentPage)
        {
            return await _context.Set<T>()
                .Skip((currentPage - 1) * sizePage).Take(sizePage)
                .ToListAsync();
        }
    }
}
