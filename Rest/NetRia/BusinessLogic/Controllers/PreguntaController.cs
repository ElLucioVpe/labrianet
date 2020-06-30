using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

using Common.DataTransferObjects;
using BusinessLogic.DataModel.Mappers;
using BusinessLogic.DataModel;
using Persistencia.Database;


namespace BusinessLogic.Controllers
{
    public class PreguntaController
    {
        private PreguntaMapper _mapperPregunta;
        public PreguntaController()
        {
            _mapperPregunta = new PreguntaMapper();
        }

        public List<DTOPregunta> GetAll()
        {
            List<DTOPregunta> preguntas = new List<DTOPregunta>();
            using (UnitOfWork uow = new UnitOfWork())
            {
                var entityList = uow.PreguntaRepository.GetAll();
                foreach (var enity in entityList)
                {
                    preguntas.Add(_mapperPregunta.MapToDTO(enity));

                }
                return preguntas;
            }

        }

        public DTOPregunta GetPregunta(int id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {

                var entity = uow.PreguntaRepository.Get(id);
                if (entity == null)
                {
                    return null;
                }

                DTOPregunta pregunta = _mapperPregunta.MapToDTO(entity);
                return pregunta;
            }
        }

        public List<DTOStatsPregunta> GetStatsRespuestas(int id)
        {
            List<DTOStatsPregunta> statsPregunta = new List<DTOStatsPregunta>();
            using (UnitOfWork uow = new UnitOfWork())
            {

                var entity = uow.PreguntaRepository.Get(id);
                if (entity == null)
                {
                    return null;
                }
                int idResp;
                int cantUsers = 0;
                foreach (Respuesta respuesta in entity.respuestas) {
                    idResp = respuesta.idRespuesta;
                    cantUsers = respuesta.respondieron.Count;

                    DTOStatsPregunta statActualRespuesta = new DTOStatsPregunta()
                    {
                        idRespuesta = idResp,
                        cantidadRespondieron = cantUsers,
                        esCorrectoRespuesta = respuesta.esCorrectoRespuesta
    };
                    statsPregunta.Add(statActualRespuesta);
                }

                return statsPregunta;
            }
        }

        public void UpdatePregunta(int id, DTOPregunta pregunta)
        {

            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {

                    Pregunta entity = uow.PreguntaRepository.Get(pregunta.idPregunta);
    
                    entity.contenidoPregunta = pregunta.contenidoPregunta;
                    entity.segundosPregunta = pregunta.segundosPregunta;
                    entity.tipoPregunta = pregunta.tipoPregunta;
                    entity.urlAyudaPregunta = pregunta.urlAyudaPregunta;
                    entity.startAyuda = pregunta.startAyuda;
                    entity.endAyuda = pregunta.endAyuda;


                    uow.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public void CreatePregunta(DTOPregunta pregunta)
        {

            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {

                    uow.PreguntaRepository.Create(_mapperPregunta.MapFromDTOPregunta(pregunta));
                    uow.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public void DeletePregunta(int id)
        {
            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {

                    if (!uow.PreguntaRepository.preguntaExists(id))
                    {
                        throw new Exception("Id de pregunta inexistente");
                    }

                    uow.PreguntaRepository.Delete(id);
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
