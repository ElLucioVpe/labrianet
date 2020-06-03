using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataTransferObjects
{
    class DTOPartida
    {
        public int id { get; set; }
        public int Juego_idJuego { get; set; }
        public string User_loginnameUser { get; set; }
        public string nickUsuario { get; set; }
    }
}
