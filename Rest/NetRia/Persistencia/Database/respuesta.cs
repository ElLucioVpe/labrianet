//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Persistencia.Database
{
    using System;
    using System.Collections.Generic;
    
    public partial class Respuesta
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Respuesta()
        {
            this.respondieron = new HashSet<Partida>();
        }
    
        public int idRespuesta { get; set; }
        public int Pregunta_idPregunta { get; set; }
        public Nullable<short> esCorrectoRespuesta { get; set; }
        public string contenidoRespuesta { get; set; }
    
        public virtual Pregunta pregunta { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Partida> respondieron { get; set; }
    }
}
