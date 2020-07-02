using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;

using Common.DataTransferObjects;
using BusinessLogic.DataModel;
using BusinessLogic.DataModel.Mappers;
using Persistencia.Database;

namespace BusinessLogic.Controllers
{
    public class JuegoController
    {
        private JuegoMapper _mapper;
        public JuegoController()
        {
            _mapper = new JuegoMapper();
        }

        public List<DTOJuego> GetAll()
        {
            List<DTOJuego> juegos = new List<DTOJuego>();
            using (UnitOfWork uow = new UnitOfWork())
            {
                var entityList = uow.JuegoRepository.GetAll();
                foreach (var entity in entityList)
                {
                    juegos.Add(_mapper.MapToDTO(entity));
                }
            }
            return juegos;
        }

        public List<DTOJuego> GetJuegosJugador(string loginName)
        {
            List<DTOJuego> juegos = new List<DTOJuego>();
            using (UnitOfWork uow = new UnitOfWork())
            {
                var entityList = uow.JuegoRepository.GetJuegosJugador(loginName);
                foreach (var entity in entityList)
                {
                    juegos.Add(_mapper.MapToDTO(entity));
                }
            }
            return juegos;
        }


        public DTOJuego GetJuego(int id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                var entity = uow.JuegoRepository.Get(id);
                if (entity == null)
                {
                    return null;
                }

                DTOJuego juego = _mapper.MapToDTO(entity);
                return juego;
            }
        }

        public DTOStatsJuego PlayersQueJugaron(string loginname)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                DTOStatsJuego retorno = new DTOStatsJuego();
                var user = uow.UserRepository.Get(loginname);
                if (user == null) return retorno;

                int JugadoresTotales = 0;
                int JugadosTotales = 0;
                
                foreach(Juego juego in user.juegos)
                {
                    DTOStatsJuego temp = GetStatsJugadores(juego.idJuego);
                    JugadoresTotales += temp.Jugadores;
                    JugadosTotales += temp.Jugados;
                }
                
                retorno = new DTOStatsJuego()
                {
                    Jugadores = JugadoresTotales,
                    Jugados = JugadosTotales,
                };
                return retorno;
            }
        }

        public List<DTORank> GetRanking(int id)
        {
            List<DTORank> ranking = new List<DTORank>();
            using (UnitOfWork uow = new UnitOfWork())
            {
                var entity = uow.JuegoRepository.Get(id);
                if (entity == null)
                {
                    return null;
                }
             
                    string nickUsuarioActual;
                    Nullable<int> puntajeActual = 0;
                    foreach (Partida partida in entity.partidas)
                    {
                        nickUsuarioActual = partida.nickUsuario;
                        puntajeActual = 0;

                        foreach (Respuesta respuesta in partida.respuestas)
                        {
                            if (respuesta.esCorrectoRespuesta == 1)
                            {

                                puntajeActual += respuesta.pregunta.puntosPregunta;

                            }
                        }
                        DTORank rankingActual = new DTORank()
                        {
                            nickUsuario = nickUsuarioActual,
                            Puntaje = puntajeActual,
                        };
                        ranking.Add(rankingActual);
                    }

                return ranking.OrderByDescending(i => i.Puntaje).ToList();
              
            }
        }

        public DTOStatsJuego GetStatsJugadores(int id) {

            using (UnitOfWork uow = new UnitOfWork())
            {
                var entity = uow.JuegoRepository.Get(id);
                if (entity == null)
                {
                    return null;
                }
                List<String> Jugadores = new List<String>();
                int PartidasJugadas = entity.partidas.Count;
                
                foreach(Partida partida in entity.partidas)
                {
                    if (partida.User_loginnameUser != "" && partida.User_loginnameUser != null)
                        if (!Jugadores.Contains(partida.User_loginnameUser)) Jugadores.Add(partida.User_loginnameUser);
                }

                DTOStatsJuego statsJuegoJugadores = new DTOStatsJuego()
                {
                    Jugadores = Jugadores.Count,
                    Jugados = PartidasJugadas,
                };

                return statsJuegoJugadores;
            }
        }

        public void UpdatePreguntaUrlJuego(int idGame, int idPregunta, string UrlPregunta) {

            using (UnitOfWork uow = new UnitOfWork())
            {
                var entity = uow.JuegoRepository.Get(idGame);

                var entityUpdatedPregunta = entity.preguntas.FirstOrDefault(a => a.idPregunta == idPregunta);
                entityUpdatedPregunta.urlAyudaPregunta=UrlPregunta;

                uow.SaveChanges();
            }


        }


        public void UpdateJuego(int id, DTOJuego juego)
        {

            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {

                    Juego entity = uow.JuegoRepository.Get(id);
                    //Despues lo hacemos mejor

                    if(juego.tituloJuego != null)
                    {
                        entity.tituloJuego = juego.tituloJuego;
                    }
                    if (juego.descripcionJuego != null){
                        entity.descripcionJuego = juego.descripcionJuego;
                    }
                    if (juego.password != null)
                    {
                        entity.password = juego.password;
                    }

                    if (juego.esPrivadoJuego != null){
                        entity.esPrivadoJuego = juego.esPrivadoJuego;
                        //Si el Game es publico no tiene Pass
                        if (juego.esPrivadoJuego == 0) {
                            entity.password = null;
                        }
                    }
                    if (juego.coverJuego != null) {
                        entity.coverJuego = juego.coverJuego;
                    }

                    if (juego.activadoJuego != null) {
                        entity.activadoJuego = juego.activadoJuego;
                    }

                    entity.Musica_idMusica = juego.Musica_idMusica;


                    uow.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int CreateJuego(DTOJuego juego)
        {
            try
            {
                int idGame;
                using (UnitOfWork uow = new UnitOfWork())
                {

                    idGame = uow.JuegoRepository.Create(_mapper.MapFromDTO(juego));
                    uow.SaveChanges();
                    return idGame;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteJuego(int id)
        {
            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {
                    if (!uow.JuegoRepository.juegoExists(id))
                    {
                        throw new Exception("Código de juego inexistente.");
                    }

                    uow.JuegoRepository.Delete(id);
                    uow.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}