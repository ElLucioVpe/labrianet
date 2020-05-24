using Common.DataTransferObjects;
using BusinessLogic.DataModel.Mappers;
using BusinessLogic.DataModel.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BusinessLogic.Controllers;

namespace NetRia.Controllers
{
    public class UserControllerAPI : ApiController
    {

        private UserMapper _mapper;
        public UserControllerAPI()
        {
            _mapper = new UserMapper();
        }

        /*/Login
        [HttpPost]
        public IHttpActionResult Login(string loginname, string password)
        {
            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                UserController controller = new UserController();
                response.Success = controller.Login(loginname, password);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }*/

        // GET: api/User
        public IEnumerable<DTOUser> GetAll()
        {

            UserController controller = new UserController();
            List<DTOUser> users = controller.GetAll();

            return users;
        }

        // GET: api/User/5
        public IHttpActionResult GetUser(int id)
        {
            UserControllerAPI controller = new UserControllerAPI();
            var user = controller.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // PUT: api/User/5
        [HttpPost]
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

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                UserControllerAPI controller = new UserControllerAPI();
                controller.UpdateUser(id, user);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }

        // POST: api/User
        [HttpPost]
        public IHttpActionResult CreateUser(DTOUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                UserControllerAPI controller = new UserControllerAPI();
                controller.CreateUser(user);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }

        // DELETE: api/User/5
        [HttpPost]
        public IHttpActionResult DeleteUser(string id)
        {
            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                UserControllerAPI controller = new UserControllerAPI();
                controller.DeleteUser(id);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.ToString();
            }
            return Ok(response);
        }
    }
}
