using Persistencia.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace NetRia.DataModel.Repositories
{
    public class UserRepository
    {
        private readonly netriaEntities db;
        public UserRepository(netriaEntities context)
        {
            this.db = context;
        }

        public bool Login(string loginname, string password)
        {
            if (!userExists(loginname)) return false;

            User user = db.Users.Find(loginname);
            if (password == user.passwordUser) return true;
            
            return false;
        }

        public List<User> GetAll()
        {
            return db.Users.ToList();
        }

        public User Get(string id)
        {
            User user = db.Users.Find(id);
            return user;
        }

        public void Update(string id, User user)
        {

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
            }
        }

        public void Create(User user)
        {
            db.Users.Add(user);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {

            }
        }

        public void Delete(string id)
        {
            User user = db.Users.Find(id);

            db.Users.Remove(user);
            db.SaveChanges();
        }

        public bool userExists(string id)
        {
            return db.Users.Count(e => e.loginnameUser == id) > 0;
        }
    }
}