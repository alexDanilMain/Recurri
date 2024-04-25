using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class CalendarTemplatesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CalendarTemplatesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/CalendarTemplates
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Template>>> GetTemplates()
    {
        // Only Include is needed, no ThenInclude for direct properties like Start and End
        return await _context.Templates.Include(t => t.Events).ToListAsync();
    }

    // GET: api/CalendarTemplates/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Template>> GetTemplate(Guid id)
    {
        var template = await _context.Templates.Include(t => t.Events).FirstOrDefaultAsync(t => t.Id == id);

        if (template == null)
        {
            return NotFound();
        }

        return template;
    }

    // POST: api/CalendarTemplates
    [HttpPost]
    public async Task<ActionResult<Template>> PostTemplate(Template template)
    {
        _context.Templates.Add(template);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetTemplate", new { id = template.Id }, template);
    }

    // PUT: api/CalendarTemplates/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTemplate(Guid id, Template template)
    {
        if (id != template.Id)
        {
            return BadRequest();
        }

        _context.Entry(template).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TemplateExists(id))
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

    // DELETE: api/CalendarTemplates/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTemplate(Guid id)
    {
        var template = await _context.Templates.FindAsync(id);
        if (template == null)
        {
            return NotFound();
        }

        _context.Templates.Remove(template);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TemplateExists(Guid id)
    {
        return _context.Templates.Any(e => e.Id == id);
    }
}
