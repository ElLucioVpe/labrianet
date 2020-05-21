using Common.DataTransferObjects;
using BusinessLogic.DataModel.Mappers;
using BusinessLogic.DataModel.Repositories;
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
            using (netriaEntities context = new netriaEntities())
            {
                RespuestaRepository repositorio = new RespuestaRepository(context);
                var entityList = repositorio.GetAll();
                foreach (var enity in entityList)
                {
                    respuestas.Add(_mapper.MapToDTO(enity));

                }
                return respuestas;
            }

        }

        public DTORespuesta GetRespuesta(int id)
        {
            using (netriaEntities context = new netriaEntities())
            {
                RespuestaRepository repositorio = new RespuestaRepository(context);
                var entity = repositorio.Get(id);
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
                using (netriaEntities context = new netriaEntities())
                {
                    RespuestaRepository repositorio = new RespuestaRepository(context);
                    UserRepository repositorioU = new UserRepository(context);
                    Respuesta entity = repositorio.Get(respuesta.idRespuesta);
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

                    context.SaveChanges();
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
                using (netriaEntities context = new netriaEntities())
                {
                    RespuestaRepository repositorio = new RespuestaRepository(context);
                    if (repositorio.respuestaExists(respuesta.idRespuesta))
                    {
                        throw new Exception("El codigo de esta respuesta ya existe");
                    }
                    repositorio.Create(_mapper.MapFromDTORespuesta(respuesta));
                    context.SaveChanges();
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
                using (netriaEntities context = new netriaEntities())
                {
                    RespuestaRepository repositorio = new RespuestaRepository(context);
                    if (!repositorio.respuestaExists(id))
                     {
                        throw new Exception("Codigo de la respuesta no existe");
                     }
                    repositorio.Delete(id);
                    context.SaveChanges();
                }

            }
            catch(Exception ex)
            {
                throw ex;
            }

        }

    }
   



}
