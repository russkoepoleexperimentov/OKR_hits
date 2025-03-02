using Domain.Entities;

namespace Domain.Repositories
{
    public interface IStudentApplicationRepository : IBaseRepository<StudentApplication>
    {
        Task<List<StudentApplication>> Search(Guid? userId, DateTime? from, DateTime? to, bool onlyOnChecking);
    }
}
