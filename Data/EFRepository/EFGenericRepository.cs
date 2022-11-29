using DomainService.Repositories;
using IdentityModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.EFRepository
{
    public class EFGenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        protected readonly ApplicationDbContext _context;

        /// <summary>
        /// Initializes a new instance of the <see cref="EFGenericRepository{TEntity}"/> class.
        /// </summary>
        /// <param name="context">ApplicationDbContext.</param>
        public EFGenericRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return await _context.Set<TEntity>().ToListAsync();
        }

        public async Task<IEnumerable<TEntity>> FindByID(int ID)
        {
            return await _context.Set<IEnumerable<TEntity>>().FindAsync(ID);
        }

        public async Task Add(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Remove(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Update(int id, TEntity entity)
        {
            TEntity obj = _context.Set<TEntity>().Find(id);
            if (obj != null)
            {
                _context.Entry(obj).CurrentValues.SetValues(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}
