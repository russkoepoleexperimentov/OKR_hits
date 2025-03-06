using Domain.Entities;

namespace Domain.Repositories
{
    public interface IAttachmentRepository : IBaseRepository<Attachment>
    {
        Task<List<Attachment>> FindByApplicationId(Guid id);
    }
}
