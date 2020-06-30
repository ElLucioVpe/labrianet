using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataTransferObjects
{
    public class DTOStatsPregunta
    {
        public int idRespuesta { get; set; }
        public int cantidadRespondieron { get; set; }
        public Nullable<short> esCorrectoRespuesta { get; set; }
    }
}
