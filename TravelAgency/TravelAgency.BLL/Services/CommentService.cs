using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelAgency.BLL.Intrefaces;
using TravelAgency.DAL.Entities;
using TravelAgency.DAL.Interfaces;
using TravelAgency.Model.ViewModels.Comment;

namespace TravelAgency.BLL.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CommentService(ICommentRepository commentRepository, IUserRepository userRepository, IUnitOfWork unitOfWork)
        {
            _commentRepository = commentRepository;
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
        }

        public Task<int> Count()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Create(CommentVM model)
        {
            User user = await _userRepository.FindByNameUser(model.Email);

            return await _commentRepository.Create(new Comment()
            {
                DateMessage = DateTime.Now,
                Message = model.Message,
                TourId = model.TourId,
                Email = model.Email,
                UserId = user.Id,
                IsRight = false
            });
        }

        public async Task<bool> Delete(int id)
        {
            Comment comment = _commentRepository.Get(id);

            if (comment == null)
            {
                return false;
            }

            return await _commentRepository.Delete(comment);
        }

        public Task<IEnumerable<CommentVM>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<CommentVM> GetById(int id)
        {
            Comment comment = _commentRepository.Get(id);

            if (comment == null)
            {
                return new CommentVM();
            }

            User user = await _userRepository.FindByIdUser(comment.UserId);

            return new CommentVM()
            {
                CommentId = comment.CommentId,
                DateMessage = comment.DateMessage,
                Email = user.Email,
                Message = comment.Message,
                TourId = comment.TourId
            };
        }

        public IEnumerable<CommentVM> GetByNotAccess()
        {
            return _commentRepository.GetByNotAccess()
                .Select(x => new CommentVM()
                {
                    CommentId = x.CommentId,
                    DateMessage = x.DateMessage,
                    Message = x.Message,
                    TourId = x.TourId,
                    Email = x.Email
                });
        }

        public async Task<IEnumerable<CommentVM>> GetByTourId(int tourId)
        {
            IList<Comment> comments = _commentRepository.GetByTour(tourId).ToList();

            return _commentRepository.GetByTour(tourId)
                .Select(x => new CommentVM()
                {
                    CommentId = x.CommentId,
                    DateMessage = x.DateMessage,
                    Message = x.Message,
                    TourId = x.TourId,
                    Email = x.Email
                });
        }

        public Task<IEnumerable<CommentVM>> GetTemp(int pageSize, int pageCurrent)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Update(CommentVM model)
        {
            Comment comment = _commentRepository.Get(model.CommentId);

            if (comment == null)
            {
                return false;
            }

            comment.IsRight = true;

            var updated = await _commentRepository.Update(comment);

            return updated;
        }
    }
}
