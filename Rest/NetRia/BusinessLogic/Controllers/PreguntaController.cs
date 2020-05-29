using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

using Common.DataTransferObjects;
using BusinessLogic.DataModel.Mappers;
using BusinessLogic.DataModel.Repositories;
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
            using (netriaEntities context = new netriaEntities())
            {
                PreguntaRepository repositorio = new PreguntaRepository(context);
                var entityList = repositorio.GetAll();
                foreach (var enity in entityList)
                {
                    preguntas.Add(_mapperPregunta.MapToDTO(enity));

                }
                return preguntas;
            }

        }

        public DTOPregunta GetPregunta(int id)
        {
            using (netriaEntities context = new netriaEntities())
            {
                PreguntaRepository repositorio = new PreguntaRepository(context);

                var entity = repositorio.Get(id);
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
                using (netriaEntities context = new netriaEntities())
                {
                    PreguntaRepository repositorio = new PreguntaRepository(context);

                    Pregunta entity = repositorio.Get(pregunta.idPregunta);
    
                    entity.contenidoPregunta = pregunta.contenidoPregunta;
                    entity.segundosPregunta = pregunta.segundosPregunta;
                    entity.tipoPregunta = pregunta.tipoPregunta;
                    entity.urlAyudaPregunta = pregunta.urlAyudaPregunta;


                    context.SaveChanges();
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
                using (netriaEntities context = new netriaEntities())
                {
                    PreguntaRepository repositorio = new PreguntaRepository(context);

                    if (repositorio.preguntaExists(pregunta.idPregunta))
                    {
                        throw new Exception("Id de pregunta existente.");
                    }
                    repositorio.Create(_mapperPregunta.MapFromDTOPregunta(pregunta));
                    context.SaveChanges();
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
                using (netriaEntities context = new netriaEntities())
                {
                    PreguntaRepository repositorio = new PreguntaRepository(context);

                    if (!repositorio.preguntaExists(id))
                    {
                        throw new Exception("Id de pregunta inexistente");
                    }

                    repositorio.Delete(id);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
