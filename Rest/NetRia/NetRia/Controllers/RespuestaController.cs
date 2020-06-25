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
    public class RespuestaController : ApiController
    {
        private RespuestaMapper _mapper;
        public RespuestaController()
        {
            _mapper = new RespuestaMapper();
        }

        // GET: api/Respuesta
        public IEnumerable<DTORespuesta> GetAll()
        {

            BusinessLogic.Controllers.RespuestaController controller = new BusinessLogic.Controllers.RespuestaController();
            List<DTORespuesta> respuestas = controller.GetAll();

            return respuestas;
        }

        // GET: api/Respuesta/5
        public IHttpActionResult GetRespuesta(int id)
        {
            BusinessLogic.Controllers.RespuestaController controller = new BusinessLogic.Controllers.RespuestaController();
            var respuesta = controller.GetRespuesta(id);
            if (respuesta == null)
            {
                return NotFound();
            }
            return Ok(respuesta);
        }

        // PUT: api/Respuesta/5
        [HttpPost]
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

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                BusinessLogic.Controllers.RespuestaController controller = new BusinessLogic.Controllers.RespuestaController();
                controller.UpdateRespuesta(id, respuesta);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }

        // POST: api/Respuesta
        [HttpPost]
        public IHttpActionResult CreateRespuesta(DTORespuesta respuesta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                BusinessLogic.Controllers.RespuestaController controller = new BusinessLogic.Controllers.RespuestaController();
                controller.CreateRespuesta(respuesta);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }

        // DELETE: api/Respuesta/5
        [HttpPost]
        public IHttpActionResult DeleteRespuesta(int id)
        {
            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                BusinessLogic.Controllers.RespuestaController controller = new BusinessLogic.Controllers.RespuestaController();
                controller.DeleteRespuesta(id);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }


        // POST: api/Respuesta
        [HttpPost]
        public IHttpActionResult RespuestaRespondida(int idRespuesta, int idPartida)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                BusinessLogic.Controllers.RespuestaController controller = new BusinessLogic.Controllers.RespuestaController();
                controller.RespuestaRespondida(idRespuesta, idPartida);
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
