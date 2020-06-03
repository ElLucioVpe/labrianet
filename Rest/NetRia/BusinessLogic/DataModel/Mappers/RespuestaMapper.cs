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
                respondieron = respuesta.respondieron.Count

            };
       

            return pRespuesta;
        }
        public Respuesta MapFromDTORespuesta(DTORespuesta dto)
        {
            if (dto == null)
                return null;
            Respuesta respuesta = new Respuesta()
            {
                idRespuesta = dto.idRespuesta,
                Pregunta_idPregunta = dto.Pregunta_idPregunta,
                esCorrectoRespuesta = dto.esCorrectoRespuesta,
                contenidoRespuesta = dto.contenidoRespuesta
            };

            UserMapper _mapperUser = new UserMapper();
            if (dto.respondieron != null)
            {
                foreach (DTOUser us in dto.respondieron)
                {
                    respuesta.respondieron.Add(_mapperUser.MapFromDTO(us));
                }


            }

            return respuesta;
        }


    }
}