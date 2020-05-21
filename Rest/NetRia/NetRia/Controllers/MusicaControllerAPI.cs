using Common.DataTransferObjects;
using NetRia.DataModel.Mappers;
using NetRia.DataModel.Repositories;
using Persistencia.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace NetRia.Controllers
{
    public class MusicaControllerAPI : ApiController
    {
        private MusicaMapper _mapper;
       

        public MusicaControllerAPI()
        {
            _mapper = new MusicaMapper();
        }

        public List<DTOMusica> GetAll()
        {
            List<DTOMusica> musicas = new List<DTOMusica>();
            using (netriaEntities context = new netriaEntities())
            {
                MusicaRepository repositorio = new MusicaRepository(context);
                var entityList = repositorio.GetAll();
                foreach (var enity in entityList)
                {
                    musicas.Add(_mapper.MapToDTO(enity));

                }
                return musicas;
            }
        }

        // GET: api/Musica/5
        [ResponseType(typeof(DTOMusica))]
        public IHttpActionResult GetMusica(int id)
        {
            using (netriaEntities context = new netriaEntities())
            {
                MusicaRepository repositorio = new MusicaRepository(context);
                var entity = repositorio.Get(id);
                if (entity == null)
                {
                    return NotFound();
                }
                DTOMusica musica = _mapper.MapToDTO(entity);
                return Ok(musica);
            }
        }

        //PUT: api/Musica/5
        [ResponseType(typeof(void))]
        public IHttpActionResult UpdateMusica(int id, DTOMusica musica)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != musica.idMusica)
            {
                return BadRequest();
            }

            try
            {
                using (netriaEntities context = new netriaEntities())
                {
                    MusicaRepository repositorio = new MusicaRepository(context);

                    Musica entity = repositorio.Get(musica.idMusica);
                    entity.idMusica = musica.idMusica;
                    entity.urlMusica = musica.urlMusica;

                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Musica
        [ResponseType(typeof(void))]
        public IHttpActionResult CreateMusica(DTOMusica musica)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                using (netriaEntities context = new netriaEntities())
                {
                    MusicaRepository repositorio = new MusicaRepository(context);

                    if (repositorio.MusicaExists(musica.urlMusica))
                    {
                        throw new Exception("Canción existente.");
                    }
                    repositorio.Create(_mapper.MapFromDTO(musica));
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/Musica/5
        [ResponseType(typeof(void))]
        public IHttpActionResult DeleteMusica(int id)
        {
            try
            {
                using (netriaEntities context = new netriaEntities())
                {
                    MusicaRepository repositorio = new MusicaRepository(context);

                    if (!repositorio.MusicaExists(id))
                    {
                        throw new Exception("Canción no existe.");
                    }

                    repositorio.Delete(id);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
