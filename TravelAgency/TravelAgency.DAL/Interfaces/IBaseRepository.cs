using System.Collections.Generic;
using System.Threading.Tasks;

namespace TravelAgency.DAL.Interfaces
{
    public interface IBaseRepository<T>
        where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<IEnumerable<T>> GetByPagination(int sizePage, int currentPage);
        Task<T> GetById(int id);
        Task<bool> Create(T entity);
        Task<bool> Update(T entity);
        Task<bool> Delete(T entity);
        Task<int> Count();
    }
}
