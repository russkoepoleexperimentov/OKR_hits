using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class AttachmentRepository : GenericRepository<Attachment>, IAttachmentRepository
    {
        public AttachmentRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<List<Attachment>?> FindByApplicationId(Guid id)
        {
            return await Set.Include(p => p.Application)
                .Where(x => x.Application.Id == id).ToListAsync();
        }

    }
}