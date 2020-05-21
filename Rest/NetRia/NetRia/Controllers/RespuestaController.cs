using Common.DataTransferObjects;
using BusinessLogic.DataModel.Mappers;
using BusinessLogic.DataModel.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.UI.WebControls;

namespace NetRia.Controllers
{
    public class RespuestaController : ApiController
    {
        private RespuestaMapper _mapper;
        private UserMapper _maperU;

        public RespuestaController()
        {
            _mapper = new RespuestaMapper();
        }
        public List<DTORespuesta> GetAll()
        {
            List<DTORespuesta> respuestas = new List<DTORespuesta>();
            using (netriaEntities context = new netriaEntities())
            {
                RespuestaRepository repositorio = new RespuestaRepository(context);
                var entityList = repositorio.GetAll();
                foreach (var enity in entityList)
                {
                    respuestas.Add(_mapper.MapToDTO(enity));

                }
                return respuestas;
            }

        }
        // GET: api/Respuesta/5
        [ResponseType(typeof(DTORespuesta))]
        public IHttpActionResult GetRespuesta(int id)
        {
            using (netriaEntities context = new netriaEntities())
            {
                RespuestaRepository repositorio = new RespuestaRepository(context);
                var entity = repositorio.Get(id);
                if (entity == null)
                {
                    return NotFound();
                }
                DTORespuesta respuesta = _mapper.MapToDTO(entity);
                return Ok(respuesta);
            }
        }
        //PUT: api/Respuesta/5
        [ResponseType(typeof(void))]
        public IHttpActionResult UpdateRespuesta(int id, DTORespuesta respuesta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != respuesta.idRespuesta)
            {
                return BadRequest();
            }

            try
            {
                using (netriaEntities context = new netriaEntities())
                {
                    RespuestaRepository repositorio = new RespuestaRepository(context);
                    UserRepository repositorioU = new UserRepository(context);
                    Respuesta entity = repositorio.Get(respuesta.idRespuesta);
                    entity.idRespuesta = respuesta.idRespuesta;
                    entity.contenidoRespuesta = respuesta.contenidoRespuesta;
                    entity.esCorrectoRespuesta = respuesta.esCorrectoRespuesta;
                    entity.Pregunta_idPregunta = respuesta.Pregunta_idPregunta;
                    List < User> usario = new List<User>();
                    foreach(var entityU in respuesta.respondieron)
                    {
                        User user = new User();
                        user.nickUser = entityU.nickUser;
                        user.loginnameUser = entityU.loginnameUser;
                        user.fechaUser = entityU.fechaUser;
                        usario.Add(user);
                    }

                    //User entityU = repositorioU.Get(respuesta.respondieron)


                    entity.respondieron = usario;

                    context.SaveChanges();
                }
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return StatusCode(HttpStatusCode.NoContent);
        }


        // POST: api/Respuesta
        [ResponseType(typeof(void))]
        public IHttpActionResult CreateRespuesta(DTORespuesta respuesta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                using (netriaEntities context = new netriaEntities())
                {
                    RespuestaRepository repositorio = new RespuestaRepository(context);
                    if (repositorio.respuestaExists(respuesta.idRespuesta))
                    {
                        throw new Exception("El codigo de esta respuesta ya existe");
                    }
                    repositorio.Create(_mapper.MapFromDTORespuesta(respuesta));
                    context.SaveChanges();
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return StatusCode(HttpStatusCode.NoContent);
     }
        // DELETE: api/Respuesta/5
        [ResponseType(typeof(void))]
        public IHttpActionResult deleteRespuesta(int id)
        {
            try
            {
                using (netriaEntities context = new netriaEntities())
                {
                    RespuestaRepository repositorio = new RespuestaRepository(context);
                    if (!repositorio.respuestaExists(id))
                     {
                        throw new Exception("Codigo de la respuesta no existe");
                     }
                    repositorio.Delete(id);
                    context.SaveChanges();
                }

            }
            catch(Exception ex)
            {
                throw ex;
            }
            return StatusCode(HttpStatusCode.NoContent);

        }

    }
   



}
