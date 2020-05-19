using Persistencia.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace NetRia.DataModel.Repositories
{
    public class JuegoRepository
    {
        private netriaEntities db = new netriaEntities();

        public IQueryable<Juego> GetAll()
        {
            return db.Juegos;
        }

        // GET: api/Juego/5
        public Juego Get(int id)
        {
            Juego juego = db.Juegos.Find(id);
            return juego;
        }

        // PUT: api/Juego/5
        public void Update(int id, Juego juego)
        {

            db.Entry(juego).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
            }
        }

        // POST: api/Juego
        public void Create(Juego juego)
        {

            db.Juegos.Add(juego);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
            }
        }

        // DELETE: api/Juego/5
        public void Delete(int id)
        {
            Juego juego = db.Juegos.Find(id);

            db.Juegos.Remove(juego);
            db.SaveChanges();
        }

        private bool juegoExists(int id)
        {
            return db.Juegos.Count(e => e.idJuego == id) > 0;
        }
    }
}