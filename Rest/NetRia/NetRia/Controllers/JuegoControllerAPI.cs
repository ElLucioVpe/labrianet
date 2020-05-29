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
    public class JuegoControllerAPI : ApiController
    {
        private JuegoMapper _mapper;
        public JuegoControllerAPI()
        {
            _mapper = new JuegoMapper();
        }

        // GET: api/Juego
        public IEnumerable<DTOJuego> GetAll()
        {

            JuegoController controller = new JuegoController();
            List<DTOJuego> juegos = controller.GetAll();

            return juegos;
        }

        // GET: api/Juego/5
        public IHttpActionResult GetJuego(int id)
        {
            JuegoController controller = new JuegoController();
            var juego = controller.GetJuego(id);
            if (juego == null)
            {
                return NotFound();
            }
            return Ok(juego);
        }

        // PUT: api/Juego/5
        [HttpPost]
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

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                JuegoController controller = new JuegoController();
                controller.UpdateJuego(id, juego);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }

        // POST: api/Juego
        [HttpPost]
        public IHttpActionResult CreateJuego(DTOJuego juego)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                JuegoController controller = new JuegoController();
                controller.CreateJuego(juego);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }

        // DELETE: api/Juego/5
        [HttpPost]
        public IHttpActionResult DeleteJuego(int id)
        {
            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                JuegoController controller = new JuegoController();
                controller.DeleteJuego(id);
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