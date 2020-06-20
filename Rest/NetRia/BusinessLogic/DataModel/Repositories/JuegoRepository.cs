using Persistencia.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace BusinessLogic.DataModel.Repositories
{
    public class JuegoRepository
    {
        private readonly netriaEntities db;
        public JuegoRepository(netriaEntities context)
        {
            this.db = context;
        }

        public List<Juego> GetAll()
        {
            return db.Juegos.ToList();
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
        public int Create(Juego juego)
        {

            db.Juegos.Add(juego);

            try
            {
                db.SaveChanges();
                return juego.idJuego;
               
            }
            catch (DbUpdateException)
            {
                return -1;
            }
        }

        // DELETE: api/Juego/5
        public void Delete(int id)
        {
            Juego juego = db.Juegos.Find(id);

            db.Juegos.Remove(juego);
            db.SaveChanges();
        }

        public bool juegoExists(int id)
        {
            return db.Juegos.Count(e => e.idJuego == id) > 0;
        }
    }
}