using Persistencia.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DataModel.Repositories
{
    public class PartidaRepository
    {
        private readonly netriaEntities db;
        public PartidaRepository(netriaEntities context)
        {
            this.db = context;
        }

        public List<Partida> GetAll()
        {
            return db.Partidas.ToList();
        }

        // GET: api/Juego/5
        public Partida Get(int id)
        {
            Partida partida = db.Partidas.Find(id);
            return partida;
        }

        // PUT: api/Juego/5
        public void Update(int id, Partida partida)
        {

            db.Entry(partida).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
            }
        }

        // POST: api/Juego
        public int Create(Partida partida)
        {

            db.Partidas.Add(partida);

            try
            {
                db.SaveChanges();
                return partida.id;
            }
            catch (DbUpdateException)
            {
                return -1;
            }
        }

        // DELETE: api/Juego/5
        public void Delete(int id)
        {
            Partida partida = db.Partidas.Find(id);

            db.Partidas.Remove(partida);
            db.SaveChanges();
        }

        public bool partidaExists(int id)
        {
            return db.Partidas.Count(e => e.id == id) > 0;
        }
    }
}
