using Core.DomainModel;
using DomainService.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.EFRepository
{
    public class EFCommentRepository : EFGenericRepository<Comment>, ICommentRepository
    {
        public EFCommentRepository(ApplicationDbContext context) : base(context)
        {
        }

        public List<Comment> GetCommentsFromUser(int id)
        {
            throw new NotImplementedException();
        }
    }
}
