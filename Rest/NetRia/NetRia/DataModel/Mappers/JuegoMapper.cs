using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Persistencia.Database;
using Common.DataTransferObjects;

namespace NetRia.DataModel.Mappers
{
    public class JuegoMapper
    {
        public DTOJuego MapToDTO(Juego juego)
        {
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
                Musica_idMusica = juego.Musica_idMusica,
                activadoJuego = juego.activadoJuego
            };
            return pJuego;
        }
        public Juego MapFromDTOUser(DTOJuego dto)
        {
            if (dto == null)
                return null;
            Juego juego = new Juego()
            {
                idJuego = dto.idJuego,
                User_loginnameUser = dto.User_loginnameUser,
                tituloJuego = dto.tituloJuego,
                descripcionJuego = dto.descripcionJuego,
                esPrivadoJuego = dto.esPrivadoJuego,
                coverJuego = dto.coverJuego,
                Musica_idMusica = dto.Musica_idMusica,
                activadoJuego = dto.activadoJuego
            };

            return juego;
        }
    }
}