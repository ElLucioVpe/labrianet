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
        private UserMapper _maperU;

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
                    List < User> usario = new List<User>();
                    foreach(var entityU in respuesta.respondieron)
                    {
                        User user = new User();
                        user.nickUser = entityU.nickUser;
                        user.loginnameUser = entityU.loginnameUser;
                        user.fechaUser = entityU.fechaUser;
                        usario.Add(user);
                    }

                    //User entityU = repositorioU.Get(respuesta.respondieron)


                    entity.respondieron = usario;

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

                    if (uow.RespuestaRepository.respuestaExists(respuesta.idRespuesta))
                    {
                        throw new Exception("El codigo de esta respuesta ya existe");
                    }
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
