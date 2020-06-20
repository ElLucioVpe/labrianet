using Common.DataTransferObjects;
using BusinessLogic.DataModel.Mappers;
using BusinessLogic.DataModel;
using Persistencia.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace BusinessLogic.Controllers
{
    public class RespuestaController
    {
        private RespuestaMapper _mapper;

        public RespuestaController()
        {
            _mapper = new RespuestaMapper();
        }
        public List<DTORespuesta> GetAll()
        {
            List<DTORespuesta> respuestas = new List<DTORespuesta>();
            using (UnitOfWork uow = new UnitOfWork())
            {
                var entityList = uow.RespuestaRepository.GetAll();
                foreach (var enity in entityList)
                {
                    respuestas.Add(_mapper.MapToDTO(enity));

                }
                return respuestas;
            }

        }

        public DTORespuesta GetRespuesta(int id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                var entity = uow.RespuestaRepository.Get(id);
                if (entity == null)
                {
                    return null;
                }
                DTORespuesta respuesta = _mapper.MapToDTO(entity);
                return respuesta;
            }
        }


        public void UpdateRespuesta(int id, DTORespuesta respuesta)
        {
            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {
                    Respuesta entity = uow.RespuestaRepository.Get(respuesta.idRespuesta);
                    entity.idRespuesta = respuesta.idRespuesta;
                    entity.contenidoRespuesta = respuesta.contenidoRespuesta;
                    entity.esCorrectoRespuesta = respuesta.esCorrectoRespuesta;
                    entity.Pregunta_idPregunta = respuesta.Pregunta_idPregunta;
                    List < Partida> partidas = new List<Partida>();
                    foreach(var entityP in respuesta.respondieron)
                    {
                        Partida partida = new Partida();
                        partida.id = entityP.id;
                        partida.Juego_idJuego = entityP.Juego_idJuego;
                        partida.User_loginnameUser = entityP.User_loginnameUser;
                        partida.nickUsuario = entityP.nickUsuario;
                        partidas.Add(partida);
                    }

                    //User entityU = repositorioU.Get(respuesta.respondieron)


                    entity.respondieron = partidas;

                    uow.SaveChanges();
                }
                
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public void CreateRespuesta(DTORespuesta respuesta)
        {

            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {

                    uow.RespuestaRepository.Create(_mapper.MapFromDTORespuesta(respuesta));
                    uow.SaveChanges();
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }

        }

        public void DeleteRespuesta(int id)
        {
            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {
                    if (!uow.RespuestaRepository.respuestaExists(id))
                     {
                        throw new Exception("Codigo de la respuesta no existe");
                     }
                    uow.RespuestaRepository.Delete(id);
                    uow.SaveChanges();
                }

            }
            catch(Exception ex)
            {
                throw ex;
            }

        }

    }
   



}
