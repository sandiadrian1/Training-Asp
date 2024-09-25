using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechnicalTest.Data;
using TechnicalTest.Models.DTO;
using TechnicalTest.Models;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ItemsController(AppDbContext context)
    {
        _context = context;
    }

   
    [HttpPost("items")]
    public async Task<IActionResult> CreateItem([FromBody] ItemDto itemDto)
    {
/*        if (ModelState.IsValid)
        {*/
            // Periksa apakah ada gambar yang di-upload
           /* string imageUrl = null;
            if (itemDto.UrlGambar != null)
            {
                // Simpan gambar dan dapatkan URL-nya
*//*                imageUrl = await SaveImage(itemDto.UrlGambar);*//*
            }*/

            // Konversi DTO ke model Item
            var item = new Item
            {
                Nama = itemDto.Nama,
                Harga = itemDto.Harga,
                Stok = itemDto.Stok,
                Kategori = itemDto.Kategori,
                UrlGambar = itemDto.UrlGambar// Simpan URL gambar, bukan file path
            };

            // Tambahkan item ke database
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return Ok(item);
/*        }

        return BadRequest(ModelState);*/
    }


    [HttpGet]
    public async Task<IActionResult> GetItems()
    {
        var items = await _context.Items.ToListAsync();
        return Ok(items);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateItem(int id, [FromBody] Item item)
    {
        var items = await _context.Items.FindAsync(id);
        if (items == null) return NotFound();

        items.Nama = item.Nama;
        items.Harga = item.Harga;
        items.Stok = item.Stok;
        items.Kategori = item.Kategori;
        items.UrlGambar = item.UrlGambar;

        await _context.SaveChangesAsync();
        return Ok(items);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteItem(int id)
    {
        var item = await _context.Items.FindAsync(id);
        if (item == null) return NotFound();

        _context.Items.Remove(item);
        await _context.SaveChangesAsync();
        return Ok();
    }
}
