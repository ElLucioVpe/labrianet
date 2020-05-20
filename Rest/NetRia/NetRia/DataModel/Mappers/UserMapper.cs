using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Persistencia.Database;
using Common.DataTransferObjects;

namespace NetRia.DataModel.Mappers
{
    public class UserMapper
    {
        public DTOUser MapToDTO(User user)
        {
            if (user == null)
                return null;
            DTOUser pUser = new DTOUser()
            {
                loginnameUser = user.loginnameUser,
                nickUser = user.nickUser,
                fechaUser = user.fechaUser
                //la password no la pasamos
            };
            return pUser;
        }
        public User MapFromDTO(DTOUser dto)
        {
            if (dto == null)
                return null;
            User user = new User()
            {
                loginnameUser = dto.loginnameUser,
                nickUser = dto.nickUser,
                fechaUser = dto.fechaUser,
                //pasamos la password para el create
                passwordUser = dto.passwordUser
            };

            return user;
        }
    }
}