using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using Common.DataTransferObjects;
using BusinessLogic.DataModel.Mappers;
using BusinessLogic.DataModel.Repositories;
using Persistencia.Database;

namespace BusinessLogic.Controllers
{
    public class JuegoController
    {
        private JuegoMapper _mapper;
        public JuegoController()
        {
            _mapper = new JuegoMapper();
        }

        public List<DTOJuego> GetAll()
        {
            List<DTOJuego> juegos = new List<DTOJuego>();
            using (netriaEntities context = new netriaEntities())
            {
                JuegoRepository repositorio = new JuegoRepository(context);

                var entityList = repositorio.GetAll();
                foreach (var entity in entityList)
                {
                    juegos.Add(_mapper.MapToDTO(entity));
                }
            }
            return juegos;
        }

        public DTOJuego GetJuego(int id)
        {
            using (netriaEntities context = new netriaEntities())
            {
                JuegoRepository repositorio = new JuegoRepository(context);

                var entity = repositorio.Get(id);
                if (entity == null)
                {
                    return null;
                }

                DTOJuego juego = _mapper.MapToDTO(entity);
                return juego;
            }
        }

        public void UpdateJuego(int id, DTOJuego juego)
        {

            try
            {
                using (netriaEntities context = new netriaEntities())
                {
                    JuegoRepository repositorio = new JuegoRepository(context);

                    Juego entity = repositorio.Get(juego.idJuego);
                    entity.idJuego = juego.idJuego;
                    entity.User_loginnameUser = juego.User_loginnameUser;
                    entity.tituloJuego = juego.tituloJuego;
                    entity.descripcionJuego = juego.descripcionJuego;
                    entity.esPrivadoJuego = juego.esPrivadoJuego;
                    entity.coverJuego = juego.coverJuego;
                    entity.Musica_idMusica = juego.Musica_idMusica;
                    entity.activadoJuego = juego.activadoJuego;

                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void CreateJuego(DTOJuego juego)
        {
            try
            {
                using (netriaEntities context = new netriaEntities())
                {
                    JuegoRepository repositorio = new JuegoRepository(context);

                    if (repositorio.juegoExists(juego.idJuego))
                    {
                        throw new Exception("Código de juego existente.");
                    }
                    repositorio.Create(_mapper.MapFromDTO(juego));
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteJuego(int id)
        {
            try
            {
                using (netriaEntities context = new netriaEntities())
                {
                    JuegoRepository repositorio = new JuegoRepository(context);

                    if (!repositorio.juegoExists(id))
                    {
                        throw new Exception("Código de juego inexistente.");
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