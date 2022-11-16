using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.DomainModel;
using Data;
using Data.EFRepository;
using DomainService.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Razor.Language.Intermediate;
using Microsoft.AspNetCore.Authentication;

namespace GastBoek_Inbisco.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private ICommentRepository _commentRepo;
        private readonly UserManager<ApplicationUser> _userManager;

        public CommentsController(ICommentRepository commentRepo, UserManager<ApplicationUser> userManager)
        {
            _commentRepo = commentRepo;
            _userManager = userManager;
        }

        // GET: api/Comments
        [HttpGet]
        public ActionResult<List<Comment>> GetComment()
        {
            return _commentRepo.GetAll().ToList();
        }

        // GET: api/Comments/5
        [HttpGet("{id}")]
        public ActionResult<Comment> GetComment(int id)
        {
            Comment comment = _commentRepo.FindByID(id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        // PUT: api/Comments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }
            Comment preComment = _commentRepo.FindByID(id); 
            
            if (preComment == null)
            {
                return BadRequest();
            }

            ApplicationUser user = await _userManager.FindByNameAsync(User.Identity.Name);

            if (user.Id != preComment.Author.Id)
            {
                return Unauthorized();
            }

            _commentRepo.Update(id, comment);
            
            return NoContent();
        }

        // POST: api/Comments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(Comment comment)
        {
            // Get id of currently logged in
            ApplicationUser user = await _userManager.FindByNameAsync(User.Identity.Name);
            comment.Author = user;
            _commentRepo.Add(comment);

            return CreatedAtAction("GetComment", new { id = comment.Id }, comment);
        }

        // DELETE: api/Comments/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = _commentRepo.FindByID(id);

            ApplicationUser user = await _userManager.FindByNameAsync(User.Identity.Name);
            if (comment == null)
            {
                return NotFound();
            }

            if(user.Id != comment.Author.Id)
            {
                return Unauthorized();
            }

            _commentRepo.Remove(comment);

            return NoContent();
        }

    }
}
