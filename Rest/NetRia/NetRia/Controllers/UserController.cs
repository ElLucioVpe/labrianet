using Common.DataTransferObjects;
using NetRia.DataModel.Mappers;
using NetRia.DataModel.Repositories;
using Persistencia.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace NetRia.Controllers
{
    public class UserController : ApiController
    {

        private UserMapper _mapper;
        public UserController()
        {
            _mapper = new UserMapper();
        }

        //Login
        [ResponseType(typeof(bool))]
        public IHttpActionResult Login(string loginname, string password)
        {
            using (netriaEntities context = new netriaEntities())
            {
                UserRepository repositorio = new UserRepository(context);

                bool retorno = repositorio.Login(loginname, password);
                return Ok(retorno);
            }
        }

        // GET: api/User
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

        // GET: api/User/5
        [ResponseType(typeof(DTOUser))]
        public IHttpActionResult GetUser(string id)
        {
            using (netriaEntities context = new netriaEntities())
            {
                UserRepository repositorio = new UserRepository(context);

                var entity = repositorio.Get(id);
                if (entity == null)
                {
                    return NotFound();
                }

                DTOUser user = _mapper.MapToDTO(entity);
                return Ok(user);
            }
        }

        // PUT: api/User/5
        [ResponseType(typeof(void))]
        public IHttpActionResult UpdateUser(string id, DTOUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.loginnameUser)
            {
                return BadRequest();
            }

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

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/User
        [ResponseType(typeof(void))]
        public IHttpActionResult CreateUser(DTOUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/User/5
        [ResponseType(typeof(void))]
        public IHttpActionResult DeleteUser(string id)
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

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
