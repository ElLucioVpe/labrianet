using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using NetRia.Models;

namespace NetRia.Controllers
{
    public class JuegoController : ApiController
    {
        private netriaEntities1 db = new netriaEntities1();

        // GET: api/Juego
        public IQueryable<juego> Getjuego()
        {
            return db.juego;
        }

        // GET: api/Juego/5
        [ResponseType(typeof(juego))]
        public IHttpActionResult Getjuego(int id)
        {
            juego juego = db.juego.Find(id);
            if (juego == null)
            {
                return NotFound();
            }

            return Ok(juego);
        }

        // PUT: api/Juego/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putjuego(int id, juego juego)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != juego.idJuego)
            {
                return BadRequest();
            }

            db.Entry(juego).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!juegoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Juego
        [ResponseType(typeof(juego))]
        public IHttpActionResult Postjuego(juego juego)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.juego.Add(juego);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (juegoExists(juego.idJuego))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = juego.idJuego }, juego);
        }

        // DELETE: api/Juego/5
        [ResponseType(typeof(juego))]
        public IHttpActionResult Deletejuego(int id)
        {
            juego juego = db.juego.Find(id);
            if (juego == null)
            {
                return NotFound();
            }

            db.juego.Remove(juego);
            db.SaveChanges();

            return Ok(juego);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool juegoExists(int id)
        {
            return db.juego.Count(e => e.idJuego == id) > 0;
        }
    }
}