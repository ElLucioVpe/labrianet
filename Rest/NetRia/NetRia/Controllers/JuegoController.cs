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
using System.IO;

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
        public IHttpActionResult GetJuegosJugador(string loginName)
        {

            BusinessLogic.Controllers.JuegoController controller = new BusinessLogic.Controllers.JuegoController();
            List<DTOJuego> juegos = controller.GetJuegosJugador(loginName);
            if (juegos.Count==0)
            {
                return NotFound();
            }
            return Ok(juegos);
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

        public IHttpActionResult GetRanking(int id)
        {
            BusinessLogic.Controllers.JuegoController controller = new BusinessLogic.Controllers.JuegoController();
            List<DTORank> ranking = controller.GetRanking(id);
            if (ranking == null)
            {
                return NotFound();
            }
            return Ok(ranking);
        }

        public IHttpActionResult GetStatsJugadoresInGame(int id)
        {
            BusinessLogic.Controllers.JuegoController controller = new BusinessLogic.Controllers.JuegoController();
            DTOStatsJuego juegoStats = controller.GetStatsJugadores(id);
            if (juegoStats == null)
            {
                return NotFound();
            }
            return Ok(juegoStats);
        }

        // GET: api/Juego/5
        public IHttpActionResult GetPlayersQueJugaron(string loginname)
        {
            BusinessLogic.Controllers.JuegoController controller = new BusinessLogic.Controllers.JuegoController();
            DTOStatsJuego players = controller.PlayersQueJugaron(loginname);
            return Ok(players);
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

            if (juego == null) return BadRequest();
            if ((id != juego.idJuego) || (juego.User_loginnameUser != identity_mail))
            {
                return BadRequest();
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
                
                var Base64Image = juego.coverJuego;
                if(Base64Image != "")
                {
                    juego.coverJuego = "Progress";
                }

                //Chequeo toda la lista de Preguntas y las pongo en progress
                List<DTOPregunta> PreguntasConUrlAyuda = new List<DTOPregunta>();
                int Orden = 0;
                if (juego.preguntas != null) {
                    foreach (DTOPregunta preg in juego.preguntas) {
                        Orden++;
                        preg.idPregunta = Orden;
                        if ((preg.urlAyudaPregunta != "") && (!preg.urlAyudaPregunta.StartsWith("http"))) {
                            DTOPregunta preguntaUrlActual = new DTOPregunta {
                                idPregunta = Orden,
                                urlAyudaPregunta = preg.urlAyudaPregunta
                            };
                            PreguntasConUrlAyuda.Add(preguntaUrlActual);
                            preg.urlAyudaPregunta="Progress";
                        }
                    }

                }
                juego.fechaJuego = new DateTime();
                //Creo Game y Cambio Cover
                idGame = controller.CreateJuego(juego);            
                if (Base64Image != "") {
                    var bytes = Convert.FromBase64String(Base64Image);
                    //string nombreFile = "coverJuego" + juego.idJuego;
                    string nombreFile = idGame+".jpg";
                    var GeneralPath = Path.GetDirectoryName(AppDomain.CurrentDomain.BaseDirectory) + "/images/covers/";

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
                    DTOJuego UpdateCoverGame = new DTOJuego {
                        coverJuego = nombreFile,
                        Musica_idMusica = juego.Musica_idMusica
                     };
                   

                    controller.UpdateJuego(idGame, UpdateCoverGame);
                }

                
                //Chequeo Lista de preguntas en Progress
                if (PreguntasConUrlAyuda != null) {
                    DTOJuego MiGameConPreguntas = controller.GetJuego(idGame);

                    foreach (DTOPregunta preg in PreguntasConUrlAyuda) {

                        int idPregunta = MiGameConPreguntas.preguntas.ElementAt(preg.idPregunta-1).idPregunta;

                        var bytes = Convert.FromBase64String(preg.urlAyudaPregunta);
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

                        preg.urlAyudaPregunta = nombreFile;
                        controller.UpdatePreguntaUrlJuego(idGame,idPregunta,preg.urlAyudaPregunta);
                    }
                }

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