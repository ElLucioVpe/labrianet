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

        public IEnumerable<DTOMusica> GetAll()
        {

            MusicaController controller = new MusicaController();
            List<DTOMusica> musicas = controller.GetAll();

            return musicas;
        }
        // GET: api/Musica/5
        public IHttpActionResult GetMusica(int id)
        {
            MusicaControllerAPI controller = new MusicaControllerAPI();
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
                MusicaControllerAPI controller = new MusicaControllerAPI();
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
        public IHttpActionResult CreateUser(DTOMusica musica)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                MusicaControllerAPI controller = new MusicaControllerAPI();
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
        public IHttpActionResult DeleteUser(int id)
        {
            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                MusicaControllerAPI controller = new MusicaControllerAPI();
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
