using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Persistencia.Database;
using Common.DataTransferObjects;

namespace NetRia.DataModel.Mappers
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
                urlMusica = musica.urlMusica
            };
            return pMusica;
        }
        public Musica MapFromDTO(DTOMusica dto)
        {
            if (dto == null)
                return null;
            Musica musica = new Musica()
            {
                idMusica = dto.idMusica,
                urlMusica = dto.urlMusica
            };

            return musica;
        }
    }
}