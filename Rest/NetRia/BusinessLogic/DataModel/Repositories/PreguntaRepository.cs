using Persistencia.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace BusinessLogic.DataModel.Repositories
{
    public class PreguntaRepository
    {
        private readonly netriaEntities db;
        public PreguntaRepository(netriaEntities context)
        {
            this.db = context;
        }

        public List<Pregunta> GetAll()
        {
            return db.Preguntas.ToList();
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
        public int Create(Pregunta pregunta)
        {

            db.Preguntas.Add(pregunta);

            try
            {
                db.SaveChanges();
                return pregunta.idPregunta;
            }
            catch (DbUpdateException)
            {
                return -1;
            }
        }

        // DELETE: api/pregunta/5
        public void Delete(int id)
        {
            Pregunta pregunta = db.Preguntas.Find(id);

            db.Preguntas.Remove(pregunta);
            db.SaveChanges();
        }

        public bool preguntaExists(int id)
        {
            return db.Preguntas.Count(e => e.idPregunta == id) > 0;
        }
    }
}