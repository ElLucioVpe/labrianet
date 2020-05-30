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

                    if (uow.PreguntaRepository.preguntaExists(pregunta.idPregunta))
                    {
                        throw new Exception("Id de pregunta existente.");
                    }
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
