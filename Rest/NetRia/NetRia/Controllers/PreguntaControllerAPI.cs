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
using BusinessLogic.Controllers;

namespace NetRia.Controllers
{
    public class PreguntaControllerAPI : ApiController
    {
        private PreguntaMapper _mapper;
        public PreguntaControllerAPI()
        {
            _mapper = new PreguntaMapper();
        }

        // GET: api/Pregunta
        public IEnumerable<DTOPregunta> GetAll()
        {

            PreguntaController controller = new PreguntaController();
            List<DTOPregunta> preguntas = controller.GetAll();

            return preguntas;
        }

        // GET: api/Pregunta/5
        public IHttpActionResult GetPregunta(int id)
        {
            PreguntaController controller = new PreguntaController();
            var pregunta = controller.GetPregunta(id);
            if (pregunta == null)
            {
                return NotFound();
            }
            return Ok(pregunta);
        }

        // PUT: api/Pregunta/5
        [HttpPost]
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

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                PreguntaController controller = new PreguntaController();
                controller.UpdatePregunta(id, pregunta);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }

        // POST: api/Pregunta
        [HttpPost]
        public IHttpActionResult CreatePregunta(DTOPregunta pregunta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                PreguntaController controller = new PreguntaController();
                controller.CreatePregunta(pregunta);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }

        // DELETE: api/Pregunta/5
        [HttpPost]
        public IHttpActionResult DeletePregunta(int id)
        {
            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                PreguntaController controller = new PreguntaController();
                controller.DeletePregunta(id);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }
    }
}
