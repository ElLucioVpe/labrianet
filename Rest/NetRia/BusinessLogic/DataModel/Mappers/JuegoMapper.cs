using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Persistencia.Database;
using Common.DataTransferObjects;

namespace BusinessLogic.DataModel.Mappers
{
    public class JuegoMapper
    {
        public DTOJuego MapToDTO(Juego juego)
        {
            UserMapper dd = new UserMapper();

            if (juego == null)
                return null;
            DTOJuego pJuego = new DTOJuego()
            {
                idJuego = juego.idJuego,
                User_loginnameUser = juego.User_loginnameUser,
                tituloJuego = juego.tituloJuego,
                descripcionJuego = juego.descripcionJuego,
                esPrivadoJuego = juego.esPrivadoJuego,
                coverJuego = juego.coverJuego,
                Musica_idMusica = juego.Musica_idMusica.GetValueOrDefault(),
                activadoJuego = juego.activadoJuego,
                password = juego.password
            };

            PreguntaMapper _mapperPreg = new PreguntaMapper();
            if (juego.preguntas != null)
            {
                pJuego.preguntas = new List<DTOPregunta>();
                foreach (Pregunta preg in juego.preguntas)
                {
                    pJuego.preguntas.Add(_mapperPreg.MapToDTO(preg));
                }
            }

            return pJuego;
        }
        public Juego MapFromDTO(DTOJuego dto)
        {
            if (dto == null)
                return null;
            Juego juego = new Juego()
            {
              
                User_loginnameUser = dto.User_loginnameUser,
                tituloJuego = dto.tituloJuego,
                descripcionJuego = dto.descripcionJuego,
                esPrivadoJuego = dto.esPrivadoJuego,
                coverJuego = dto.coverJuego,
                Musica_idMusica = dto.Musica_idMusica,
                activadoJuego = dto.activadoJuego,
                password = dto.password

            };

            PreguntaMapper _mapperPreg = new PreguntaMapper();
            if (dto.preguntas != null)
            {
                foreach (DTOPregunta preg in dto.preguntas)
                {
                    juego.preguntas.Add(_mapperPreg.MapFromDTOPregunta(preg));
                }
            }

            return juego;
        }
    }
}