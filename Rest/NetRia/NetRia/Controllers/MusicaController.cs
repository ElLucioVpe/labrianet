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
    public class MusicaController : ApiController
    {
        private MusicaMapper _mapper;
       

        public MusicaController()
        {
            _mapper = new MusicaMapper();
        }

        public IEnumerable<DTOMusica> GetAll()
        {

            BusinessLogic.Controllers.MusicaController controller = new BusinessLogic.Controllers.MusicaController();
            List<DTOMusica> musicas = controller.GetAll();

            return musicas;
        }
        // GET: api/Musica/5
        public IHttpActionResult GetMusica(int id)
        {
            BusinessLogic.Controllers.MusicaController controller = new BusinessLogic.Controllers.MusicaController();
            var musica = controller.GetMusica(id);
            if (musica == null)
            {
                return NotFound();
            }
            return Ok(musica);
        }

        //PUT: api/Musica/5
        [HttpPost]
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

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                BusinessLogic.Controllers.MusicaController controller = new BusinessLogic.Controllers.MusicaController();
                controller.UpdateMusica(id, musica);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }


        // POST: api/Musica
        [HttpPost]
        public IHttpActionResult CreateMusica(DTOMusica musica)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                BusinessLogic.Controllers.MusicaController controller = new BusinessLogic.Controllers.MusicaController();
                controller.CreateMusica(musica);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }


        // DELETE: api/Musica/5
        [ResponseType(typeof(void))]
        [HttpPost]
        public IHttpActionResult DeleteMusica(int id)
        {
            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                BusinessLogic.Controllers.MusicaController controller = new BusinessLogic.Controllers.MusicaController();
                controller.DeleteMusica(id);
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
