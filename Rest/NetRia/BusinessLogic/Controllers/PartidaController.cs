using BusinessLogic.DataModel.Mappers;
using BusinessLogic.DataModel;
using Common.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Persistencia.Database;

namespace BusinessLogic.Controllers
{
    class PartidaController
    {
        private PartidaMapper _mapper;
        public PartidaController()
        {
            _mapper = new PartidaMapper();
        }

        public List<DTOPartida> GetAll()
        {
            List<DTOPartida> partidas = new List<DTOPartida>();
            using (UnitOfWork uow = new UnitOfWork())
            {
                var entityList = uow.PartidaRepository.GetAll();
                foreach (var entity in entityList)
                {
                    partidas.Add(_mapper.MapToDTO(entity));
                }
            }
            return partidas;
        }

        public DTOPartida GetPartida(int id)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                var entity = uow.PartidaRepository.Get(id);
                if (entity == null)
                {
                    return null;
                }

                DTOPartida partida = _mapper.MapToDTO(entity);
                return partida;
            }
        }

        //No esta bueno que pueda editar el id y el id de juego, este update esta mas al pedo que la reina de ing
        public void UpdatePartida(int id, DTOPartida partida)
        {

            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {

                    Partida entity = uow.PartidaRepository.Get(partida.id);
                    entity.id = partida.id;
                    entity.Juego_idJuego = partida.Juego_idJuego;
                    entity.nickUsuario = partida.nickUsuario;



                    uow.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void CreatePartida(DTOPartida partida)
        {
            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {

                    if (uow.PartidaRepository.partidaExists(partida.id))
                    {
                        throw new Exception("Código de partida existente.");
                    }
                    uow.PartidaRepository.Create(_mapper.MapFromDTO(partida));
                    uow.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeletePartida(int id)
        {
            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {
                    if (!uow.PartidaRepository.partidaExists(id))
                    {
                        throw new Exception("Código de partida inexistente.");
                    }

                    uow.PartidaRepository.Delete(id);
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
