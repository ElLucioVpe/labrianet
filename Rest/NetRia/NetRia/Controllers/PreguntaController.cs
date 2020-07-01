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
using System.IO;

namespace NetRia.Controllers
{
    public class PreguntaController : ApiController
    {
        private PreguntaMapper _mapper;
        public PreguntaController()
        {
            _mapper = new PreguntaMapper();
        }

        // GET: api/Pregunta
        public IEnumerable<DTOPregunta> GetAll()
        {

            BusinessLogic.Controllers.PreguntaController controller = new BusinessLogic.Controllers.PreguntaController();
            List<DTOPregunta> preguntas = controller.GetAll();

            return preguntas;
        }

        // GET: api/Pregunta/5
        public IHttpActionResult GetPregunta(int id)
        {
            BusinessLogic.Controllers.PreguntaController controller = new BusinessLogic.Controllers.PreguntaController();
            var pregunta = controller.GetPregunta(id);
            if (pregunta == null)
            {
                return NotFound();
            }
            return Ok(pregunta);
        }


        // GET: api/Pregunta/5
        public IHttpActionResult GetStatsRespuestas(int id)
        {
            BusinessLogic.Controllers.PreguntaController controller = new BusinessLogic.Controllers.PreguntaController();
            List<DTOStatsPregunta> statsPregunta = controller.GetStatsRespuestas(id);
       
            return Ok(statsPregunta);
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
                BusinessLogic.Controllers.PreguntaController controller = new BusinessLogic.Controllers.PreguntaController();
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
            int idPregunta;
            try
            {
                BusinessLogic.Controllers.PreguntaController controller = new BusinessLogic.Controllers.PreguntaController();

                var Base64Image = pregunta.urlAyudaPregunta;

                if (Base64Image != "" && !Base64Image.StartsWith("http"))
                {
                    pregunta.urlAyudaPregunta = "Progress";
                }

                idPregunta = controller.CreatePregunta(pregunta);

                if (Base64Image != "" && !Base64Image.StartsWith("http"))
                {
                    var bytes = Convert.FromBase64String(Base64Image);
                    string nombreFile = idPregunta + ".jpg";
                    var GeneralPath = Path.GetDirectoryName(AppDomain.CurrentDomain.BaseDirectory) + "/images/ayuda/";

                    if (!Directory.Exists(GeneralPath))
                    {
                        Directory.CreateDirectory(GeneralPath);
                    }

                    string filePath = GeneralPath + nombreFile;
                    using (var imageFile = new FileStream(filePath, FileMode.Create))
                    {
                        imageFile.Write(bytes, 0, bytes.Length);
                        imageFile.Flush();
                    }
                    DTOPregunta UpdateUrlAyudaPregunta = new DTOPregunta
                    {
                        urlAyudaPregunta = nombreFile
                    };


                    controller.UpdatePregunta(idPregunta, UpdateUrlAyudaPregunta);
                }
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
                BusinessLogic.Controllers.PreguntaController controller = new BusinessLogic.Controllers.PreguntaController();
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
