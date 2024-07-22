using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/Scraplets")]
    [ApiController]
    public class ScrapletsController : ControllerBase
    {
        private readonly ScrapletContext _context;

        public ScrapletsController(ScrapletContext context)
        {
            _context = context;
        }

        // GET: api/Scraplets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Scraplet>>> GetScraplets()
        {
            return await _context.Scraplets.ToListAsync();
        }

        // GET: api/Scraplets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Scraplet>> GetScraplet(long id)
        {
            var scraplet = await _context.Scraplets.FindAsync(id);

            if (scraplet == null)
            {
                return NotFound();
            }

            return scraplet;
        }

        // PUT: api/Scraplets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScraplet(long id, Scraplet scraplet)
        {
            if (id != scraplet.Id)
            {
                return BadRequest();
            }

            scraplet.Modified = DateTime.Now;

            _context.Entry(scraplet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScrapletExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Scraplets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Scraplet>> PostScraplet(Scraplet scraplet)
        {

            scraplet.Created = DateTime.Now;
            scraplet.Modified = DateTime.Now;

            _context.Scraplets.Add(scraplet);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetScraplet), new { id = scraplet.Id }, scraplet);
        }

        // DELETE: api/Scraplets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScraplet(long id)
        {
            var scraplet = await _context.Scraplets.FindAsync(id);
            if (scraplet == null)
            {
                return NotFound();
            }

            _context.Scraplets.Remove(scraplet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ScrapletExists(long id)
        {
            return _context.Scraplets.Any(e => e.Id == id);
        }
    }
}
