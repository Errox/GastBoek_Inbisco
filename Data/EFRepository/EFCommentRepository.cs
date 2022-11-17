using Core.DomainModel;
using DomainService.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.EFRepository
{
    public class EFCommentRepository : EFGenericRepository<Comment>, ICommentRepository
    {
        protected readonly ApplicationDbContext _context;
        public EFCommentRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public List<Comment> GetCommentsFromUser(ApplicationUser user)
        {
            return _context.Comments.Include(e => e.Author).Where(x => x.Author == user).ToList();
        }

        public List<Comment> GetCommentsWithUsers()
        {
            return _context.Comments.Include(e => e.Author).OrderByDescending(x => x.CreatedDate).ToList();
        }

        public Comment GetSpecificCommentByIdWithUser(int id)
        {
            return _context.Comments.Include(e => e.Author).FirstOrDefault(x => x.Id == id);
        }
    }
}
