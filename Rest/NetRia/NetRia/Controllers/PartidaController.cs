using System;
using System.Collections.Generic;
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
    public class PartidaController : ApiController
    {
        private PartidaMapper _mapper;
       

        public PartidaController()
        {
            _mapper = new PartidaMapper();
        }

        public IEnumerable<DTOPartida> GetAll()
        {

            BusinessLogic.Controllers.PartidaController controller = new BusinessLogic.Controllers.PartidaController();
            List<DTOPartida> partidas = controller.GetAll();

            return partidas;
        }
        // GET: api/Partida/5
        public IHttpActionResult GetPartida(int id)
        {
            PartidaController controller = new PartidaController();
            var partida = controller.GetPartida(id);
            if (partida == null)
            {
                return NotFound();
            }
            return Ok(partida);
        }

        //PUT: api/Partida/5
        [HttpPost]
        public IHttpActionResult UpdatePartida(int id, DTOPartida partida)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != partida.id)
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
                PartidaController controller = new PartidaController();
                controller.UpdatePartida(id, partida);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }


        // POST: api/Partida
        [HttpPost]
        public IHttpActionResult CreatePartida(DTOPartida partida)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                BusinessLogic.Controllers.PartidaController controller = new BusinessLogic.Controllers.PartidaController();
                controller.CreatePartida(partida);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }


        // DELETE: api/Partida/5
        [ResponseType(typeof(void))]
        [HttpPost]
        public IHttpActionResult DeletePartida(int id)
        {
            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                BusinessLogic.Controllers.PartidaController controller = new BusinessLogic.Controllers.PartidaController();
                controller.DeletePartida(id);
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
