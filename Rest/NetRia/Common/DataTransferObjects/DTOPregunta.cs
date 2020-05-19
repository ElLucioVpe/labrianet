using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataTransferObjects
{
    public class DTOPregunta
    {
        public int idPregunta { get; set; }
        public int Juego_idJuego { get; set; }
        public Nullable<int> segundosPregunta { get; set; }
        public Nullable<int> puntosPregunta { get; set; }
        public string contenidoPregunta { get; set; }
        public string tipoPregunta { get; set; }
        public string urlAyudaPregunta { get; set; }


        public List<DTORespuesta> respuestas { get; set; }

    }
}
