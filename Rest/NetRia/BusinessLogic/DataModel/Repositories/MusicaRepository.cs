using Persistencia.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace BusinessLogic.DataModel.Repositories
{
    public class MusicaRepository
    {
        private readonly netriaEntities db;
        public MusicaRepository(netriaEntities context)
        {
            this.db = context;
        }

        public List<Musica> GetAll()
        {
            return db.Musicas.ToList();
        }

        // GET: api/musica/5
        public Musica Get(int id)
        {
            Musica musica = db.Musicas.Find(id);
            return musica;
        }

        // PUT: api/musica/5
        public void Update(int id, Musica musica)
        {

            db.Entry(musica).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
            }
        }

        // POST: api/musica
        public void Create(Musica musica)
        {

            db.Musicas.Add(musica);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
            }
        }

        // DELETE: api/musica/5
        public void Delete(int id)
        {
            Musica musica = db.Musicas.Find(id);

            db.Musicas.Remove(musica);
            db.SaveChanges();
        }

        public bool musicaExists(int id)
        {
            return db.Musicas.Count(e => e.idMusica == id) > 0;
        }
    }
}