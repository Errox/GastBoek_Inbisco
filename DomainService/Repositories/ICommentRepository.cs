using Core.DomainModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainService.Repositories
{
    public interface ICommentRepository : IGenericRepository<Comment>
    {
        public Task<List<Comment>> GetCommentsFromUser(ApplicationUser user);
        public Task<List<Comment>> GetCommentsWithUsers();
        public Task<Comment> GetSpecificCommentByIdWithUser(int id);

    }
}
