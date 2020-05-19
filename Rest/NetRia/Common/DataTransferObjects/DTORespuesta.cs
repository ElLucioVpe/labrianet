using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataTransferObjects
{
    public class DTORespuesta
    {
        public int idRespuesta { get; set; }
        public int Pregunta_idPregunta { get; set; }
        public string esCorrectoRespuesta { get; set; }
        public string contenidoRespuesta { get; set; }

        public List <DTOUser> respondieron { get; set; }

    }
}
