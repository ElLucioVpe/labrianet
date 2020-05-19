using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Persistencia.Database;
using Common.DataTransferObjects;

namespace NetRia.DataModel.Mappers
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
                contenidoRespuesta = respuesta.contenidoRespuesta

            };
            UserMapper _mapperUser = new UserMapper();
            if (respuesta.respondieron != null)
            {
                foreach (User us in respuesta.respondieron)
                {
                    pRespuesta.respondieron.Add(_mapperUser.MapToDTO(us));
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
                    respuesta.respondieron.Add(_mapperUser.MapFromDTOUser(us));
                }


            }

            return respuesta;
        }


    }
}