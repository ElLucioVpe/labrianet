using Common.DataTransferObjects;
using BusinessLogic.DataModel.Mappers;
using BusinessLogic.DataModel;
using Persistencia.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace BusinessLogic.Controllers
{
    public class MusicaController
    {
        private MusicaMapper _mapper;
        public MusicaController()
        {
            _mapper = new MusicaMapper();
        }

        public List<DTOMusica> GetAll()
        {
            List<DTOMusica> musicas = new List<DTOMusica>();
            using (UnitOfWork uow = new UnitOfWork())
            {
                var entityList = uow.MusicaRepository.GetAll();
                foreach (var enity in entityList)
                {
                    musicas.Add(_mapper.MapToDTO(enity));

                }
                return musicas;
            }
        }

        public DTOMusica GetMusica(int id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                var entity = uow.MusicaRepository.Get(id);
                if (entity == null)
                {
                    return null;
                }
                DTOMusica musica = _mapper.MapToDTO(entity);
                return musica;
            }
        }

        public void UpdateMusica(int id, DTOMusica musica)
        {

            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {

                    Musica entity = uow.MusicaRepository.Get(musica.idMusica);
                    entity.idMusica = musica.idMusica;
                    entity.urlMusica = musica.urlMusica;
                    entity.tituloMusica = musica.tituloMusica;

                    uow.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void CreateMusica(DTOMusica musica)
        {

            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {

                    uow.MusicaRepository.Create(_mapper.MapFromDTO(musica));
                    uow.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public void DeleteMusica(int id)
        {
            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {

                    if (!uow.MusicaRepository.musicaExists(id))
                    {
                        throw new Exception("Canción no existe.");
                    }

                    uow.MusicaRepository.Delete(id);
                    uow.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
