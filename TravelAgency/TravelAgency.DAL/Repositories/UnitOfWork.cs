using System;
using System.Threading.Tasks;
using TravelAgency.DAL.Context;
using TravelAgency.DAL.Interfaces;

namespace TravelAgency.DAL.Repositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly DatabaseContext _context;

        private ITourRepository _tourRepository;
        private IHotelRepository _hotelRepository;
        private IBelTourRepository _belTourRepository;

        public UnitOfWork(DatabaseContext context)
        {
            _context = context;
        }

        public ITourRepository Tours
        {
            get
            {
                if (_tourRepository == null)
                {
                    _tourRepository = new TourRepository(_context);
                }

                return _tourRepository;
            }
        }

        public IHotelRepository Hotels
        {
            get
            {
                if (_hotelRepository == null)
                {
                    _hotelRepository = new HotelRepository(_context);
                }

                return _hotelRepository;
            }
        }

        public IBelTourRepository BelTours
        {
            get
            {
                if (_hotelRepository == null)
                {
                    _belTourRepository = new BelTourRepository(_context);
                }

                return _belTourRepository;
            }
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public async Task<int> SaveChanges()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
