using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelAgency.DAL.Context;
using TravelAgency.DAL.Entities;
using TravelAgency.DAL.Interfaces;

namespace TravelAgency.DAL.Repositories
{
    class BelTourRepository : BaseRepository<BelTour>, IBelTourRepository
    {
        public BelTourRepository(DatabaseContext context)
            : base(context)
        {
        }


    }
}
