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

        public async Task<List<Comment>> GetCommentsFromUser(ApplicationUser user)
        {
            return await _context.Comments.Include(e => e.Author).Where(x => x.Author == user).ToListAsync();
        }

        public async Task<List<Comment>> GetCommentsWithUsers()
        {
            return await _context.Comments.Include(e => e.Author).OrderByDescending(x => x.CreatedDate).ToListAsync();
        }

        public async Task<Comment> GetSpecificCommentByIdWithUser(int id)
        {
            return await _context.Comments.Include(e => e.Author).FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
