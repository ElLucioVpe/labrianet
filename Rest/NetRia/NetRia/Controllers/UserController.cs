using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NetRia.Controllers
{
    public class UserController : ApiController
    {

        [HttpPost]
        public IHttpActionResult Add() {

            using (Models.netriaEntities1 db= new Models.netriaEntities1()) {

                var oUser = new Models.user();
                oUser.nickUser = "Test";
                oUser.passwordUser = "testJE";
                oUser.loginnameUser = "Test";
                oUser.fechaUser = DateTime.Now;
                db.user.Add(oUser);
                db.SaveChanges();

            }

            return Ok("New User Pimba");

        }
    }
}
