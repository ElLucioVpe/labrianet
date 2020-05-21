using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using Common.DataTransferObjects;
using BusinessLogic.DataModel.Mappers;
using BusinessLogic.DataModel.Repositories;
using System.Web.Http.Description;


namespace NetRia.Controllers
{
    public class PreguntaController : ApiController
    {
        private PreguntaMapper _mapperPregunta;
        public PreguntaController()
        {
            _mapperPregunta = new PreguntaMapper();
        }



        // GET:DTO PREG POR ID
        [ResponseType(typeof(DTOPregunta))]
        public IHttpActionResult GetPregunta(int id)
        {
            using (netriaEntities context = new netriaEntities())
            {
                PreguntaRepository repositorio = new PreguntaRepository(context);

                var entity = repositorio.Get(id);
                if (entity == null)
                {
                    return NotFound();
                }

                DTOPregunta pregunta = _mapperPregunta.MapToDTO(entity);
                return Ok(pregunta);
            }
        }


        // PUT: UPDATE PREGUNTA PA QUE NI IDEA
        [ResponseType(typeof(void))]
        public IHttpActionResult UpdatePregunta(int id, DTOPregunta pregunta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pregunta.idPregunta)
            {
                return BadRequest();
            }

            try
            {
                using (netriaEntities context = new netriaEntities())
                {
                    PreguntaRepository repositorio = new PreguntaRepository(context);

                    Pregunta entity = repositorio.Get(pregunta.idPregunta);
    
                    entity.contenidoPregunta = pregunta.contenidoPregunta;
                    entity.segundosPregunta = pregunta.segundosPregunta;
                    entity.tipoPregunta = pregunta.tipoPregunta;
                    entity.urlAyudaPregunta = pregunta.urlAyudaPregunta;


                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }


        // POST: CREATE PREGUNTA
        [ResponseType(typeof(void))]
        public IHttpActionResult CreatePregunta(DTOPregunta pregunta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                using (netriaEntities context = new netriaEntities())
                {
                    PreguntaRepository repositorio = new PreguntaRepository(context);

                    if (repositorio.preguntaExists(pregunta.idPregunta))
                    {
                        throw new Exception("Id de pregunta existente.");
                    }
                    repositorio.Create(_mapperPregunta.MapFromDTOPregunta(pregunta));
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }



        // DELETE: PREGUNTA
        [ResponseType(typeof(void))]
        public IHttpActionResult DeletePregunta(int id)
        {
            try
            {
                using (netriaEntities context = new netriaEntities())
                {
                    PreguntaRepository repositorio = new PreguntaRepository(context);

                    if (!repositorio.preguntaExists(id))
                    {
                        throw new Exception("Id de pregunta inexistente");
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
