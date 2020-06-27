using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Persistencia.Database;
using Common.DataTransferObjects;

namespace BusinessLogic.DataModel.Mappers
{
    public class RespuestaMapper
    {

        public DTORespuesta MapToDTO(Respuesta respuesta)
        {
            if (respuesta == null)
                return null;
            DTORespuesta pRespuesta = new DTORespuesta()
            {
                idRespuesta = respuesta.idRespuesta,
                Pregunta_idPregunta = respuesta.Pregunta_idPregunta,
                esCorrectoRespuesta = respuesta.esCorrectoRespuesta,
                contenidoRespuesta = respuesta.contenidoRespuesta,
            };

            PartidaMapper _mapperPartida = new PartidaMapper();
            if (respuesta.respondieron != null) {
                pRespuesta.respondieron = new List<DTOPartida>();
                foreach (Partida part in respuesta.respondieron)
                {
                    pRespuesta.respondieron.Add(_mapperPartida.MapToDTO(part));
                }
            }


            return pRespuesta;
        }
        public Respuesta MapFromDTORespuesta(DTORespuesta dto)
        {
            if (dto == null)
                return null;
            Respuesta respuesta = new Respuesta()
            {
           
                Pregunta_idPregunta = dto.Pregunta_idPregunta,
                esCorrectoRespuesta = dto.esCorrectoRespuesta,
                contenidoRespuesta = dto.contenidoRespuesta
            };

            PartidaMapper _mapperPartida = new PartidaMapper();
            if (dto.respondieron != null)
            {
                foreach (DTOPartida part in dto.respondieron)
                {
                    respuesta.respondieron.Add(_mapperPartida.MapFromDTO(part));
                }


            }

            return respuesta;
        }


    }
}