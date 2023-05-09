using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelAgency.BLL.Intrefaces;
using TravelAgency.DAL.Entities;
using TravelAgency.DAL.Interfaces;
using TravelAgency.Model.ViewModels.Hotel;
using TravelAgency.Model.ViewModels.Tour;

namespace TravelAgency.BLL.Services
{
    public class TourService : ITourService
    {
        private readonly IUnitOfWork _unitOfWork;

        public TourService()
        {
        }

        public TourService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<int> Count()
        {
            return await _unitOfWork.Tours
                .Count();
        }

        public async Task<int> CountHotelsById(int tourId)
        {
            return await _unitOfWork.Tours
              .GetCountHotelsById(tourId);
        }

        public async Task<bool> Create(TourVM model)
        {
            return await _unitOfWork.Tours
                .Create(new Tour()
                {
                    TourName = model.TourName,
                    Cost = model.Cost,
                    CountryFrom = model.CountryFrom,
                    CountryTo = model.CountryTo,
                    DateStart = model.DateStart,
                    Duration = model.Duration,
                    ImagePath = model.ImagePath,
                    AboutTour = model.AboutTour,
                    Transport = model.Transport,
                    IsHotTour = model.IsHotTour
                });
        }

        public async Task<bool> Delete(int id)
        {
            var tour = await _unitOfWork.Tours
                .GetById(id);

            if (tour == null)
            {
                return false;
            }

            return await _unitOfWork.Tours
                .Delete(tour);
        }

        public async Task<IEnumerable<TourVM>> GetAll()
        {
            var tours = await _unitOfWork.Tours
                .GetAll();

            return tours.Select(x => new TourVM() 
            {
                Cost = x.Cost,
                CountryFrom = x.CountryFrom,
                Sale = x.Sale,
                CountryTo = x.CountryTo,
                DateStart = x.DateStart,
                Duration = x.Duration,
                TourId = x.TourId,
                TourName = x.TourName,
                ImagePath = x.ImagePath,
                AboutTour = x.AboutTour,
                Transport = x.Transport,
                IsHotTour = x.IsHotTour
            });
        }

        public async Task<TourVM> GetById(int id)
        {
            var tour = await _unitOfWork.Tours
                .GetById(id);

            if (tour == null)
            {
                return new TourVM();
            }

            return new TourVM()
            {
                Cost = tour.Cost,
                CountryFrom = tour.CountryFrom,
                Sale = tour.Sale,
                CountryTo = tour.CountryTo,
                DateStart = tour.DateStart,
                Duration = tour.Duration,
                TourId = tour.TourId,
                TourName = tour.TourName,
                ImagePath = tour.ImagePath,
                AboutTour = tour.AboutTour,
                Transport = tour.Transport,
                IsHotTour = tour.IsHotTour
            };
        }

        public async Task<IEnumerable<HotelVM>> GetHotelsById(int pageSize, int pageCurrent, int tourId)
        {
            var tours = await _unitOfWork.Tours
              .GetHotelsById(pageSize, pageCurrent, tourId);

            return tours.Select(x => new HotelVM()
            {
                HotelId = x.HotelId,
                Class = x.Class,
                Cost = x.Cost,
                Description = x.Description,
                HotelName = x.HotelName,
                ImagePath = x.ImagePath,
                TourId = x.TourId
            });
        }

        public async Task<IEnumerable<TourVM>> GetTemp(int pageSize, int pageCurrent)
        {
            var tours = await _unitOfWork.Tours
                .GetByPagination(pageSize, pageCurrent);

            return tours.Select(x => new TourVM()
            {
                Cost = x.Cost * (100 - x.Sale) / 100,
                Sale = x.Sale,
                CountryFrom = x.CountryFrom,
                CountryTo = x.CountryTo,
                DateStart = x.DateStart,
                Duration = x.Duration,
                TourId = x.TourId,
                TourName = x.TourName,
                AboutTour = x.AboutTour,
                Transport = x.Transport,
                ImagePath = x.ImagePath,
                IsHotTour = x.IsHotTour
            });
        }

        public async Task<IEnumerable<TourVM>> GetHotToursPagination(int pageSize, int pageCurrent)
        {
            var tours = await _unitOfWork.Tours
                .GetHotToursPagination(pageSize, pageCurrent);

            return tours.Where(x => x.IsHotTour == 1).Select(x => new TourVM()
            {
                Cost = x.Cost * (100- x.Sale) / 100,
                CountryFrom = x.CountryFrom,
                CountryTo = x.CountryTo,
                DateStart = x.DateStart,
                Duration = x.Duration,
                TourId = x.TourId,
                TourName = x.TourName,
                AboutTour = x.AboutTour,
                Transport = x.Transport,
                ImagePath = x.ImagePath,
                IsHotTour = x.IsHotTour,
                Sale = x.Sale
            });
        }

        public async Task<bool> Update(TourVM model)
        {
            var tour = await _unitOfWork.Tours
              .GetById(model.TourId);

            if (tour == null)
            {
                return false;
            }

            tour.TourName = model.TourName;
            tour.CountryFrom = model.CountryFrom;
            tour.CountryTo = model.CountryTo;
            tour.DateStart = model.DateStart;
            tour.Duration = model.Duration;
            tour.ImagePath = model.ImagePath;
            tour.AboutTour = model.AboutTour;
            tour.Transport = model.Transport;
            tour.Cost = model.Cost;
            tour.IsHotTour = model.IsHotTour;
            tour.Sale = model.Sale;

            return await _unitOfWork.Tours
                .Update(tour);
        }
    }
}
