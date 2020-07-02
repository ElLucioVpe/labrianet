using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataTransferObjects
{
    public class DTOJuego
    {
        public int idJuego { get; set; }
        public string User_loginnameUser { get; set; }
        public string tituloJuego { get; set; }
        public string descripcionJuego { get; set; }
        public Nullable<short> esPrivadoJuego { get; set; }
        public string coverJuego { get; set; }
        public int Musica_idMusica { get; set; }
        public Nullable<short> activadoJuego { get; set; }
        public string password { get; set; }
        public Nullable<DateTime> fechaJuego { get; set; }
        public List<DTOPregunta> preguntas { get; set; }
    }
}
