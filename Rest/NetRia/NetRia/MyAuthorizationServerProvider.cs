using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace NetRia
{
    public class MyAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated(); // 
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);

            //Llamamos el login de estaban bro
            //El UserName del context tendria que ser el correo si se pueden editar el nick, no me acuerdo xD LOQUENDO, mareado con el otro proyecto o que ase bordy
            if (context.UserName == "user" && context.Password == "user")
            {

                identity.AddClaim(new Claim(ClaimTypes.Role, "user"));
                identity.AddClaim(new Claim("correo", "correoUser"));
                identity.AddClaim(new Claim("nick", "nickUser"));

                context.Validated(identity);
            }
            else {
                context.SetError("invalid_grant","Usuario o Password incorrecto");
                return;
            }
        }
    }
}