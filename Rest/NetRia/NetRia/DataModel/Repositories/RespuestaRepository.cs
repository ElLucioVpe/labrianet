using Persistencia.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace NetRia.DataModel.Repositories
{
    public class RespuestaRepository
    {
        private readonly netriaEntities db;
        public RespuestaRepository(netriaEntities context)
        {
            this.db = context;
        }

        public List<Respuesta> GetAll()
        {
            return db.Respuestas.ToList();
        }

        // GET: api/respuesta/5
        public Respuesta Get(int id)
        {
            Respuesta respuesta = db.Respuestas.Find(id);
            return respuesta;
        }

        // PUT: api/respuesta/5
        public void Update(int id, Respuesta respuesta)
        {

            db.Entry(respuesta).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
            }
        }

        // POST: api/respuesta
        public void Create(Respuesta respuesta)
        {

            db.Respuestas.Add(respuesta);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
            }
        }

        // DELETE: api/respuesta/5
        public void Delete(int id)
        {
            Respuesta respuesta = db.Respuestas.Find(id);

            db.Respuestas.Remove(respuesta);
            db.SaveChanges();
        }

        public bool respuestaExists(int id)
        {
            return db.Respuestas.Count(e => e.idRespuesta == id) > 0;
        }
    }
}