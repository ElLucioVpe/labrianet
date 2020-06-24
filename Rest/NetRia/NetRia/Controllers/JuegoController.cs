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
using System.Security.Claims;

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
        public IEnumerable<DTOJuego> GetAll()
        {

            BusinessLogic.Controllers.JuegoController controller = new BusinessLogic.Controllers.JuegoController();
            List<DTOJuego> juegos = controller.GetAll();

            return juegos;
        }

        // GET: api/Juego
        public IEnumerable<DTOJuego> GetJuegosJugador(string loginName)
        {

            BusinessLogic.Controllers.JuegoController controller = new BusinessLogic.Controllers.JuegoController();
            List<DTOJuego> juegos = controller.GetJuegosJugador(loginName);

            return juegos;
        }

        // GET: api/Juego/5
        public IHttpActionResult GetJuego(int id)
        {
            BusinessLogic.Controllers.JuegoController controller = new BusinessLogic.Controllers.JuegoController();
            var juego = controller.GetJuego(id);
            if (juego == null)
            {
                return NotFound();
            }
            return Ok(juego);
        }

        // PUT: api/Juego/5
        [Authorize]
        [HttpPost]
        public IHttpActionResult UpdateJuego(int id, DTOJuego juego)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = (ClaimsIdentity)User.Identity;
            var identity_mail = identity.Claims.Where(c => c.Type == ClaimTypes.Email)
               .Select(c => c.Value).SingleOrDefault();

            if ((id != juego.idJuego) || (juego.User_loginnameUser != identity_mail))
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
                BusinessLogic.Controllers.JuegoController controller = new BusinessLogic.Controllers.JuegoController();
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

            //DTOBaseResponse response = new DTOBaseResponse();
            int idGame;

            try
            {
                BusinessLogic.Controllers.JuegoController controller = new BusinessLogic.Controllers.JuegoController();
                idGame = controller.CreateJuego(juego);
                
            }
            catch (Exception ex)
            {
                idGame = -1;
            }
            return Ok(idGame);
        }

        // DELETE: api/Juego/5
        [Authorize]
        [HttpPost]
        public IHttpActionResult DeleteJuego(int id)
        {
            var identity = (ClaimsIdentity)User.Identity;
            var identity_mail = identity.Claims.Where(c => c.Type == ClaimTypes.Email)
               .Select(c => c.Value).SingleOrDefault();

            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                BusinessLogic.Controllers.JuegoController controller = new BusinessLogic.Controllers.JuegoController();
                DTOJuego juego = controller.GetJuego(id);
                if (juego.User_loginnameUser == identity_mail)
                {
                    controller.DeleteJuego(id);
                    response.Success = true;
                } else response.Success = false;
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