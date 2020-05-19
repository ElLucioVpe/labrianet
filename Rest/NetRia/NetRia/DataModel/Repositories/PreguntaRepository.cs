using Persistencia.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace NetRia.DataModel.Repositories
{
    public class PreguntaRepository
    {
        private netriaEntities db = new netriaEntities();

        public IQueryable<Pregunta> GetAll()
        {
            return db.Preguntas;
        }

        // GET: api/pregunta/5
        public Pregunta Get(int id)
        {
            Pregunta pregunta = db.Preguntas.Find(id);
            return pregunta;
        }

        // PUT: api/pregunta/5
        public void Update(int id, Pregunta pregunta)
        {

            db.Entry(pregunta).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
            }
        }

        // POST: api/pregunta
        public void Create(Pregunta pregunta)
        {

            db.Preguntas.Add(pregunta);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
            }
        }

        // DELETE: api/pregunta/5
        public void Delete(int id)
        {
            Pregunta pregunta = db.Preguntas.Find(id);

            db.Preguntas.Remove(pregunta);
            db.SaveChanges();
        }

        private bool preguntaExists(int id)
        {
            return db.Preguntas.Count(e => e.idPregunta == id) > 0;
        }
    }
}