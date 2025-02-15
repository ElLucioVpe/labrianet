﻿using System;
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
        public Nullable<short> esCorrectoRespuesta { get; set; }
        public string contenidoRespuesta { get; set; }

        public List<DTOPartida> respondieron { get; set; }

    }
}
