using Common.DataTransferObjects;
using BusinessLogic.DataModel.Mappers;
using BusinessLogic.DataModel.Repositories;
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
            using (netriaEntities context = new netriaEntities())
            {
                MusicaRepository repositorio = new MusicaRepository(context);
                var entityList = repositorio.GetAll();
                foreach (var enity in entityList)
                {
                    musicas.Add(_mapper.MapToDTO(enity));

                }
                return musicas;
            }
        }

        public DTOMusica GetMusica(int id)
        {
            using (netriaEntities context = new netriaEntities())
            {
                MusicaRepository repositorio = new MusicaRepository(context);
                var entity = repositorio.Get(id);
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
                using (netriaEntities context = new netriaEntities())
                {
                    MusicaRepository repositorio = new MusicaRepository(context);

                    Musica entity = repositorio.Get(musica.idMusica);
                    entity.idMusica = musica.idMusica;
                    entity.urlMusica = musica.urlMusica;

                    context.SaveChanges();
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
                using (netriaEntities context = new netriaEntities())
                {
                    MusicaRepository repositorio = new MusicaRepository(context);

                    if (repositorio.musicaExists(musica.idMusica))
                    {
                        throw new Exception("Canción existente.");
                    }
                    repositorio.Create(_mapper.MapFromDTO(musica));
                    context.SaveChanges();
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
                using (netriaEntities context = new netriaEntities())
                {
                    MusicaRepository repositorio = new MusicaRepository(context);

                    if (!repositorio.musicaExists(id))
                    {
                        throw new Exception("Canción no existe.");
                    }

                    repositorio.Delete(id);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
