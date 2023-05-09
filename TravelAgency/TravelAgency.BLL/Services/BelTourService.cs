using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelAgency.BLL.Intrefaces;
using TravelAgency.DAL.Entities;
using TravelAgency.DAL.Interfaces;
using TravelAgency.Model.ViewModels.BelTour;

namespace TravelAgency.BLL.Services
{
    public class BelTourService : IBelTourService
    {
        private readonly IUnitOfWork _unitOfWork;

        public BelTourService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<int> Count()
        {
            return await _unitOfWork.BelTours.Count();
        }
        public async Task<bool> Create(BelTourVM model)
        {
            return await _unitOfWork.BelTours.Create(new BelTour()
            {
                BelTourName = model.BelTourName,
                PlaceFrom = model.PlaceFrom,
                PlaceTo = model.PlaceTo,
                Duration = model.Duration,
                Cost = model.Cost,
                ImagePath = model.ImagePath,
                AboutTour = model.AboutTour,
                Transport = model.Transport,
                Sale = model.Sale,
                DateStart = model.DateStart
            });
        }

        public async Task<bool> Delete(int id)
        {
            var belTour = await _unitOfWork.BelTours
                .GetById(id);

            if (belTour == null)
            {
                return false;
            }

            return await _unitOfWork.BelTours
                .Delete(belTour);
        }

        public async Task<IEnumerable<BelTourVM>> GetAll()
        {
            var belTour = await _unitOfWork.BelTours
               .GetAll();

            return belTour.Select(x => new BelTourVM()
            {
                BelTourId = x.BelTourId,
                BelTourName = x.BelTourName,
                PlaceFrom = x.PlaceFrom,
                PlaceTo = x.PlaceTo,
                Duration = x.Duration,
                Cost = x.Cost,
                ImagePath = x.ImagePath,
                AboutTour = x.AboutTour,
                Transport = x.Transport,
                Sale = x.Sale,
                DateStart = x.DateStart

            });
        }

        public async Task<BelTourVM> GetById(int id)
        {
            var belTour = await _unitOfWork.BelTours
                  .GetById(id);

            if (belTour == null)
            {
                return new BelTourVM();
            }

            return new BelTourVM()
            {
                BelTourId = belTour.BelTourId,
                BelTourName = belTour.BelTourName,
                PlaceFrom = belTour.PlaceFrom,
                PlaceTo = belTour.PlaceTo,
                Duration = belTour.Duration,
                Cost = belTour.Cost,
                ImagePath = belTour.ImagePath,
                AboutTour = belTour.AboutTour,
                Transport = belTour.Transport,
                Sale = belTour.Sale,
                DateStart = belTour.DateStart
            };
        }

        public async Task<IEnumerable<BelTourVM>> GetTemp(int pageSize, int pageCurrent)
        {
            var belTour = await _unitOfWork.BelTours
               .GetByPagination(pageSize, pageCurrent);

            return belTour.Select(x => new BelTourVM()
            {
                BelTourId = x.BelTourId,
                BelTourName = x.BelTourName,
                PlaceFrom = x.PlaceFrom,
                PlaceTo = x.PlaceTo,
                Duration = x.Duration,
                Cost = x.Cost,
                ImagePath = x.ImagePath,
                AboutTour = x.AboutTour,
                Transport = x.Transport,
                Sale = x.Sale,
                DateStart = x.DateStart
            });
        }

        public async Task<bool> Update(BelTourVM model)
        {
            var belTour = await _unitOfWork.BelTours
                      .GetById(model.BelTourId);

            if (belTour == null)
            {
                return false;
            }

            belTour.BelTourId = model.BelTourId;
            belTour.BelTourName = model.BelTourName;
            belTour.PlaceFrom = model.PlaceFrom;
            belTour.PlaceTo = model.PlaceTo;
            belTour.Duration = model.Duration;
            belTour.Cost = model.Cost;
            belTour.ImagePath = model.ImagePath;
            belTour.AboutTour = model.AboutTour;
            belTour.Transport = model.Transport;
            belTour.Sale = model.Sale;
            belTour.DateStart = model.DateStart;

            return await _unitOfWork.BelTours
                .Update(belTour);
        }
    }
}
