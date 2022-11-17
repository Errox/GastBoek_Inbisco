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
using Core.ViewModels;

namespace GastBoek_Inbisco.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private ICommentRepository _commentRepo;
        private readonly UserManager<ApplicationUser> _userManager;

        public CommentsController(ICommentRepository commentRepo, UserManager<ApplicationUser> userManager)
        {
            _commentRepo = commentRepo;
            _userManager = userManager;
        }

        // GET: comments
        [HttpGet]
        public IEnumerable<Comment> Get()
        {
            var comments = _commentRepo.GetCommentsWithUsers();
            Console.WriteLine(comments);
            return comments.ToArray();
        }

        // GET: api/Comments/5
        [HttpGet("{id}")]
        public ActionResult<Comment> Get(int id)
        {
            Comment comment = _commentRepo.GetSpecificCommentByIdWithUser(id);

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
        public async Task<IActionResult> Update(int id, AddComment comment)
        {
            if (comment == null)
            {
                return BadRequest();
            }

            Comment preComment = _commentRepo.GetSpecificCommentByIdWithUser(id); 
            
            if (preComment == null)
            {
                return BadRequest();
            }

            ApplicationUser user = _userManager.Users.FirstOrDefault(x => x.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (user.Id != preComment.Author.Id)
            {
                return Unauthorized();
            }

            Comment newComment = new Comment()
            {
                Id = id,
                Title = comment.Title,
                Description = comment.Description,
                Author = user,
            };

            _commentRepo.Update(id, newComment);
            
            return NoContent();
        }

        // POST: api/Comments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Comment>> Add(AddComment comment)
        {
            // Get id of currently logged in
            ApplicationUser user = _userManager.Users.FirstOrDefault(x => x.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);

            Comment com = new Comment();
            com.Title = comment.Title;
            com.Description = comment.Description;
            com.Author = user;
            _commentRepo.Add(com);

            return CreatedAtAction("GetComment", new { id = com.Id }, com);
        }

        // DELETE: api/Comments/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var comment = _commentRepo.GetSpecificCommentByIdWithUser(id);

            ApplicationUser user = _userManager.Users.FirstOrDefault(x => x.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
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
