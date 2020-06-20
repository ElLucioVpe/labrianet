using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Persistencia.Database;
using Common.DataTransferObjects;

namespace BusinessLogic.DataModel.Mappers
{
    public class PreguntaMapper
    {
        public DTOPregunta MapToDTO(Pregunta pregunta)
        {
            if (pregunta == null)
                return null;
            DTOPregunta pPregunta = new DTOPregunta()
            {
                Juego_idJuego = pregunta.Juego_idJuego,
                idPregunta = pregunta.idPregunta,
                segundosPregunta = pregunta.segundosPregunta,
                puntosPregunta = pregunta.puntosPregunta,
                contenidoPregunta = pregunta.contenidoPregunta,
                tipoPregunta = pregunta.tipoPregunta,
                urlAyudaPregunta = pregunta.urlAyudaPregunta,  
                startAyuda = pregunta.startAyuda,
                endAyuda = pregunta.endAyuda

            };


            RespuestaMapper _mapperResp = new RespuestaMapper();
            if (pregunta.respuestas != null) {
                foreach (Respuesta resp in pregunta.respuestas)
                {
                    pPregunta.respuestas.Add(_mapperResp.MapToDTO(resp));
                }
            }
            return pPregunta;
        }


        public Pregunta MapFromDTOPregunta(DTOPregunta dto)
        {
            if (dto == null)
                return null;
            Pregunta pregunta = new Pregunta()
            {
        
                idPregunta = dto.idPregunta,
                segundosPregunta = dto.segundosPregunta,
                puntosPregunta = dto.puntosPregunta,
                contenidoPregunta = dto.contenidoPregunta,
                tipoPregunta = dto.tipoPregunta,
                urlAyudaPregunta = dto.urlAyudaPregunta,
                startAyuda = dto.startAyuda,
                endAyuda = dto.endAyuda

            };

            RespuestaMapper _mapperResp = new RespuestaMapper();
            if (dto.respuestas != null)
            {
                foreach (DTORespuesta resp in dto.respuestas)
                {
                    pregunta.respuestas.Add(_mapperResp.MapFromDTORespuesta(resp));
                }
            }
            return pregunta;
        }
    }
}