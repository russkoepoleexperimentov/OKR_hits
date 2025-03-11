using Common.Enums;
using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class StudentApplicationRepository : GenericRepository<StudentApplication>, IStudentApplicationRepository
    {
        public StudentApplicationRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<List<StudentApplication>> Search(Guid? authorId, DateTime? from, DateTime? to, bool onlyOnChecking = false)
        {
            from ??= DateTime.MinValue;
            to ??= DateTime.MaxValue;

            var query = Set.Where(app =>
                app.StartDate.Date >= from.Value.Date && app.StartDate.Date <= to.Value.Date || 
                app.EndDate.Date >= from.Value.Date && app.EndDate.Date <= to.Value.Date ||
                app.StartDate.Date <= from.Value.Date && app.EndDate.Date >= to.Value.Date
            );

            if(authorId != null)
            {
                query = query.Where(app => app.Author.Id == authorId.Value);
            }

            if (onlyOnChecking)
            {
                query = query.Where(app => app.Status == StudentApplicationStatus.Checking);
            }

            return await query.ToListAsync();
        }
    }
}
