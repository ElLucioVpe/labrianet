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
    public class UserController
    {

        private UserMapper _mapper;
        public UserController()
        {
            _mapper = new UserMapper();
        }

        public bool Login(string loginname, string password)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {

                bool retorno = uow.UserRepository.Login(loginname, password);
                return retorno;
            }
        }

        public List<DTOUser> GetAll()
        {
            List<DTOUser> users = new List<DTOUser>();
            using (UnitOfWork uow = new UnitOfWork())
            {

                var entityList = uow.UserRepository.GetAll();
                foreach (var entity in entityList)
                {
                    users.Add(_mapper.MapToDTO(entity));
                }
            }
            return users;
        }

        public DTOUser GetUser(string id)
        {
            using(UnitOfWork uow = new UnitOfWork())
            {

                var entity = uow.UserRepository.Get(id);
                if (entity == null)
                {
                    return null;
                }

                DTOUser user = _mapper.MapToDTO(entity);
                return user;
            }
        }

        public void UpdateUser(string id, DTOUser user)
        {

            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {

                    User entity = uow.UserRepository.Get(user.loginnameUser);
                    entity.loginnameUser = user.loginnameUser;
                    entity.nickUser = user.nickUser;
                    entity.passwordUser = user.passwordUser;
                    entity.fechaUser = user.fechaUser;

                    uow.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public void CreateUser(DTOUser user)
        {

            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {

                    if (uow.UserRepository.userExists(user.loginnameUser))
                    {
                        throw new Exception("Nombre de usuario existente.");
                    }
                    uow.UserRepository.Create(_mapper.MapFromDTO(user));
                    uow.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public void DeleteUser(string id)
        {
            try
            {
                using (UnitOfWork uow = new UnitOfWork())
                {

                    if (!uow.UserRepository.userExists(id))
                    {
                        throw new Exception("Nombre de usuario inexistente.");
                    }

                    uow.UserRepository.Delete(id);
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
