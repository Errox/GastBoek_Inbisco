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
        public List<Comment> GetCommentsFromUser(int id);

    }
}
