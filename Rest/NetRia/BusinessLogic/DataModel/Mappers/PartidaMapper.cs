using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Persistencia.Database;
using Common.DataTransferObjects;

namespace BusinessLogic.DataModel.Mappers
{
    public class PartidaMapper
    {
        public DTOPartida MapToDTO(Partida partida)
        {
            UserMapper dd = new UserMapper();

            if (partida == null)
                return null;
            DTOPartida pPartida = new DTOPartida()
            {
                id = partida.id,
                Juego_idJuego = partida.Juego_idJuego,
                nickUsuario = partida.nickUsuario

           };

            if (partida.User_loginnameUser!=null) {
                pPartida.User_loginnameUser = partida.User_loginnameUser;
            }

           
           
            return pPartida;
        }
        public Partida MapFromDTO(DTOPartida dto)
        {
            if (dto == null)
                return null;
            Partida partida = new Partida()
            {
                id = dto.id,
                Juego_idJuego = dto.Juego_idJuego,
                nickUsuario = dto.nickUsuario
            };

            if (dto.User_loginnameUser != null)
            {
                partida.User_loginnameUser = dto.User_loginnameUser;
            }


            return partida;
        }
    }
}
