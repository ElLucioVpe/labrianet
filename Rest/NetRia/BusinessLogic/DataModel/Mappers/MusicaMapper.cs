using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Persistencia.Database;
using Common.DataTransferObjects;

namespace BusinessLogic.DataModel.Mappers
{
    public class MusicaMapper
    {
        public DTOMusica MapToDTO(Musica musica)
        {
            if (musica == null)
                return null;
            DTOMusica pMusica = new DTOMusica()
            {
                idMusica = musica.idMusica,
                urlMusica = musica.urlMusica,
                tituloMusica= musica.tituloMusica
            };
            return pMusica;
        }
        public Musica MapFromDTO(DTOMusica dto)
        {
            if (dto == null)
                return null;
            Musica musica = new Musica()
            {
              
                urlMusica = dto.urlMusica,
                tituloMusica = dto.tituloMusica
            };

            return musica;
        }
    }
}