using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TravelAgency.BLL.Intrefaces;
using TravelAgency.DAL.Entities;
using TravelAgency.DAL.Interfaces;
using TravelAgency.Model.ViewModels.Hotel;

namespace TravelAgency.BLL.Services
{
    public class HotelService : IHotelService
    {
        private readonly IUnitOfWork _unitOfWork;
        //private readonly IHostingEnvironment hostingEnvironment;

        public HotelService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        //public HotelService() { }

        //public HotelService(IUnitOfWork unitOfWork, IHostingEnvironment hostingEnvironment)
        //{
        //    _unitOfWork = unitOfWork;
        //    this.hostingEnvironment = hostingEnvironment;
        //}

        public async Task<int> Count()
        {
            return await _unitOfWork.Hotels
                  .Count();
        }

        public async Task<bool> Create(HotelVM model)
        {

            // byte[] imageData = null;

            //if (model.ImagePath != null)
            // using (var binaryReader = new BinaryReader(model.ImagePath.OpenReadStream()))
            // {
            //     imageData = binaryReader.ReadBytes((int)model.ImagePath.Length);
            // }


            /*string uniqueFileName = null;
            List<string> totalFileName = new List<string>(); ;
            if(model.Image != null && model.Image.Count > 0)
            {
                foreach (IFormFile photo in model.Image)
                {
                    string uploadsFolder = Path.Combine(hostingEnvironment.WebRootPath, "images");
                    uniqueFileName = model.TourId.ToString() + "_" + model.HotelName.ToString()  + "_" + photo.FileName;
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                    totalFileName.Add(uniqueFileName);
                    photo.CopyTo(new FileStream(filePath, FileMode.Create));
                }
            }*/

            return await _unitOfWork.Hotels                      
                   .Create(new Hotel()
                   {
                       Class = model.Class,
                       Cost = model.Cost,
                       Description = model.Description,
                       HotelName = model.HotelName,
                       ImagePath = model.ImagePath, //imageData
                       HotelSize = model.HotelSize,
                       TourId = model.TourId
                   });
        }

        public async Task<bool> Delete(int id)
        {
            var hotel = await _unitOfWork.Hotels
                .GetById(id);

            if (hotel == null)
            {
                return false;
            }

            return await _unitOfWork.Hotels
                .Delete(hotel);
        }

        public async Task<IEnumerable<HotelVM>> GetAll()
        {
            var hotels = await _unitOfWork.Hotels
               .GetAll();

            return hotels.Select(x => new HotelVM()
            {
                HotelId = x.HotelId,
                Class = x.Class,
                Cost = x.Cost,
                Description = x.Description,
                HotelName = x.HotelName,
                TourId = x.TourId,
                ImagePath=x.ImagePath,
                HotelSize =x.HotelSize
                
            });
        }

        public async Task<HotelVM> GetById(int id)
        {
            var hotel = await _unitOfWork.Hotels
                  .GetById(id);

            if (hotel == null)
            {
                return new HotelVM();
            }

            return  new HotelVM()
            {
                HotelId = hotel.HotelId,
                Class = hotel.Class,
                Cost = hotel.Cost,
                Description = hotel.Description,
                HotelName = hotel.HotelName,
                TourId = hotel.TourId,
                ImagePath = hotel.ImagePath,
                HotelSize = hotel.HotelSize
            };
        }
        public class HotelVMDownload {
            public int HotelId { get; set; }
            public string HotelName { get; set; }
            public int Cost { get; set; }
            public int Class { get; set; }
            public string Description { get; set; }
            public int TourId { get; set; }
            public string ImagePath { get; set; }
        }


        public async Task<IEnumerable<HotelVM>> GetTemp(int pageSize, int pageCurrent)
        {
            var hotels = await _unitOfWork.Hotels
               .GetByPagination(pageSize, pageCurrent);

            return hotels.Select(x => new HotelVM()
            {
                HotelId = x.HotelId,
                Class = x.Class,
                Cost = x.Cost,
                Description = x.Description,
                HotelName = x.HotelName,
                TourId = x.TourId,
                ImagePath = x.ImagePath,
                HotelSize = x.HotelSize
        });
        }

        public async Task<bool> Update(HotelVM model)
        {
            var hotel = await _unitOfWork.Hotels
                      .GetById(model.HotelId);

            if (hotel == null)
            {
                return false;
            }

            hotel.Class = model.Class;
            hotel.Cost = model.Cost;
            hotel.Description = model.Description;
            hotel.HotelName = model.HotelName;
            hotel.TourId = model.TourId;
            hotel.ImagePath = model.ImagePath;
            hotel.HotelSize = model.HotelSize;

            return await _unitOfWork.Hotels
                .Update(hotel);
        }
    }
}
