using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;

using Common.DataTransferObjects;
using BusinessLogic.DataModel;
using BusinessLogic.DataModel.Mappers;
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
            using (UnitOfWork uow = new UnitOfWork())
            {
                var entityList = uow.JuegoRepository.GetAll();
                foreach (var entity in entityList)
                {
                    juegos.Add(_mapper.MapToDTO(entity));
                }
            }
            return juegos;
        }

        public List<DTOJuego> GetJuegosJugador(string loginName)
        {
            List<DTOJuego> juegos = new List<DTOJuego>();
            using (UnitOfWork uow = new UnitOfWork())
            {
                var entityList = uow.JuegoRepository.GetJuegosJugador(loginName);
                foreach (var entity in entityList)
                {
                    juegos.Add(_mapper.MapToDTO(entity));
                }
            }
            return juegos;
        }


        public DTOJuego GetJuego(int id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                var entity = uow.JuegoRepository.Get(id);
                if (entity == null)
                {
                    return null;
                }

                DTOJuego juego = _mapper.MapToDTO(entity);
                return juego;
            }
        }

        public int PlayersQueJugaron(int id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                int players = 0;
                players = uow.JuegoRepository.PlayersQueJugaron(id);
                return players;
            }
        }

        public void UpdateJuego(int id, DTOJuego juego)
        {

            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {

                    Juego entity = uow.JuegoRepository.Get(juego.idJuego);
                    entity.idJuego = juego.idJuego;
                    entity.User_loginnameUser = juego.User_loginnameUser;
                    entity.tituloJuego = juego.tituloJuego;
                    entity.descripcionJuego = juego.descripcionJuego;
                    entity.esPrivadoJuego = juego.esPrivadoJuego;
                    entity.coverJuego = juego.coverJuego;
                    entity.Musica_idMusica = juego.Musica_idMusica;
                    entity.activadoJuego = juego.activadoJuego;
                    entity.password = juego.password;

                    uow.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int CreateJuego(DTOJuego juego)
        {
            try
            {
                int idGame;
                using (UnitOfWork uow = new UnitOfWork())
                {

                    idGame = uow.JuegoRepository.Create(_mapper.MapFromDTO(juego));
                    uow.SaveChanges();
                    return idGame;
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
                using (UnitOfWork uow = new UnitOfWork())
                {
                    if (!uow.JuegoRepository.juegoExists(id))
                    {
                        throw new Exception("Código de juego inexistente.");
                    }

                    uow.JuegoRepository.Delete(id);
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