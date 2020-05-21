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
using Common.DataTransferObjects;
using BusinessLogic.DataModel.Mappers;
using BusinessLogic.DataModel.Repositories;

namespace NetRia.Controllers
{
    public class JuegoController : ApiController
    {
        private JuegoMapper _mapper;
        public JuegoController()
        {
            _mapper = new JuegoMapper();
        }

        // GET: api/Juego
        public List<DTOJuego> GetAll()
        {
            List<DTOJuego> juegos = new List<DTOJuego>();
            using (netriaEntities context = new netriaEntities())
            {
                JuegoRepository repositorio = new JuegoRepository(context);

                var entityList = repositorio.GetAll();
                foreach (var entity in entityList)
                {
                    juegos.Add(_mapper.MapToDTO(entity));
                }
            }
            return juegos;
        }

        // GET: api/Juego/5
        [ResponseType(typeof(DTOJuego))]
        public IHttpActionResult GetJuego(int id)
        {
            using (netriaEntities context = new netriaEntities())
            {
                JuegoRepository repositorio = new JuegoRepository(context);

                var entity = repositorio.Get(id);
                if (entity == null)
                {
                    return NotFound();
                }

                DTOJuego juego = _mapper.MapToDTO(entity);
                return Ok(juego);
            }
        }

        // PUT: api/Juego/5
        [ResponseType(typeof(void))]
        public IHttpActionResult UpdateJuego(int id, DTOJuego juego)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != juego.idJuego)
            {
                return BadRequest();
            }

            try
            {
                using (netriaEntities context = new netriaEntities())
                {
                    JuegoRepository repositorio = new JuegoRepository(context);

                    Juego entity = repositorio.Get(juego.idJuego);
                    entity.idJuego = juego.idJuego;
                    entity.User_loginnameUser = juego.User_loginnameUser;
                    entity.tituloJuego = juego.tituloJuego;
                    entity.descripcionJuego = juego.descripcionJuego;
                    entity.esPrivadoJuego = juego.esPrivadoJuego;
                    entity.coverJuego = juego.coverJuego;
                    entity.Musica_idMusica = juego.Musica_idMusica;
                    entity.activadoJuego = juego.activadoJuego;

                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Juego
        [ResponseType(typeof(void))]
        public IHttpActionResult CreateJuego(DTOJuego juego)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                using (netriaEntities context = new netriaEntities())
                {
                    JuegoRepository repositorio = new JuegoRepository(context);

                    if (repositorio.juegoExists(juego.idJuego))
                    {
                        throw new Exception("Código de juego existente.");
                    }
                    repositorio.Create(_mapper.MapFromDTO(juego));
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/Juego/5
        [ResponseType(typeof(void))]
        public IHttpActionResult DeleteJuego(int id)
        {
            try
            {
                using (netriaEntities context = new netriaEntities())
                {
                    JuegoRepository repositorio = new JuegoRepository(context);

                    if (!repositorio.juegoExists(id))
                    {
                        throw new Exception("Código de juego inexistente.");
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