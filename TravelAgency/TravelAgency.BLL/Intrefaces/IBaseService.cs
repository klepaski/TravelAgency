using System.Collections.Generic;
using System.Threading.Tasks;

namespace TravelAgency.BLL.Intrefaces
{
    public interface IBaseService<T>
         where T : class
    {
        Task<IEnumerable<T>> GetTemp(int pageSize, int pageCurrent);
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(int id);
        Task<bool> Create(T model);
        Task<bool> Update(T model);
        Task<bool> Delete(int id);
        Task<int> Count();
    }
}
