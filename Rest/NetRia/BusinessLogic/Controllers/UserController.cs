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
    public class UserController
    {

        private UserMapper _mapper;
        public UserController()
        {
            _mapper = new UserMapper();
        }

        public bool Login(string loginname, string password)
        {
            using (netriaEntities context = new netriaEntities())
            {
                UserRepository repositorio = new UserRepository(context);

                bool retorno = repositorio.Login(loginname, password);
                return Ok(retorno);
            }
        }

        public List<DTOUser> GetAll()
        {
            List<DTOUser> users = new List<DTOUser>();
            using (netriaEntities context = new netriaEntities())
            {
                UserRepository repositorio = new UserRepository(context);

                var entityList = repositorio.GetAll();
                foreach (var entity in entityList)
                {
                    users.Add(_mapper.MapToDTO(entity));
                }
            }
            return users;
        }

        public DTOUser GetUser(string id)
        {
            using (netriaEntities context = new netriaEntities())
            {
                UserRepository repositorio = new UserRepository(context);

                var entity = repositorio.Get(id);
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
                using (netriaEntities context = new netriaEntities())
                {
                    UserRepository repositorio = new UserRepository(context);

                    User entity = repositorio.Get(user.loginnameUser);
                    entity.loginnameUser = user.loginnameUser;
                    entity.nickUser = user.nickUser;
                    entity.passwordUser = user.passwordUser;
                    entity.fechaUser = user.fechaUser;

                    context.SaveChanges();
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
                using (netriaEntities context = new netriaEntities())
                {
                    UserRepository repositorio = new UserRepository(context);

                    if (repositorio.userExists(user.loginnameUser))
                    {
                        throw new Exception("Nombre de usuario existente.");
                    }
                    repositorio.Create(_mapper.MapFromDTO(user));
                    context.SaveChanges();
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
                using (netriaEntities context = new netriaEntities())
                {
                    UserRepository repositorio = new UserRepository(context);

                    if (!repositorio.userExists(id))
                    {
                        throw new Exception("Nombre de usuario inexistente.");
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
