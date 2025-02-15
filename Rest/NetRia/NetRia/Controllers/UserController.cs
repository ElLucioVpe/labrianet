﻿using Common.DataTransferObjects;
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
using System.Security.Claims;

namespace NetRia.Controllers
{
    public class UserController : ApiController
    {

        private UserMapper _mapper;
        public UserController()
        {
            _mapper = new UserMapper();
        }

        // GET: api/User
        [Authorize]
        [HttpGet]
        public IEnumerable<DTOUser> GetAll()
        {

            BusinessLogic.Controllers.UserController controller = new BusinessLogic.Controllers.UserController();
            List<DTOUser> users = controller.GetAll();

            return users;
        }

        // GET: api/User/5
        [Authorize]
        public IHttpActionResult GetUser(string id)
        {
            BusinessLogic.Controllers.UserController controller = new BusinessLogic.Controllers.UserController();
            var user = controller.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // PUT: api/User/5
        [Authorize]
        [HttpPost]
        public IHttpActionResult UpdateUser(string id, DTOUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = (ClaimsIdentity)User.Identity;
            var identity_mail = identity.Claims.Where(c => c.Type == ClaimTypes.Email)
               .Select(c => c.Value).SingleOrDefault();

            if ((id != user.loginnameUser) && (id != identity_mail))
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
                BusinessLogic.Controllers.UserController controller = new BusinessLogic.Controllers.UserController();
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
                BusinessLogic.Controllers.UserController controller = new BusinessLogic.Controllers.UserController();
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
        [Authorize]
        [HttpPost]
        public IHttpActionResult DeleteUser(string id)
        {
            DTOBaseResponse response = new DTOBaseResponse();
            try
            {
                var identity = (ClaimsIdentity)User.Identity;
                var identity_mail = identity.Claims.Where(c => c.Type == ClaimTypes.Email)
                   .Select(c => c.Value).SingleOrDefault();

                if (id == identity_mail)
                {
                    BusinessLogic.Controllers.UserController controller = new BusinessLogic.Controllers.UserController();
                    controller.DeleteUser(id);
                    response.Success = true;
                }
                else response.Success = false;
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
