using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataTransferObjects
{
    public class DTOUser
    {
        public string loginnameUser { get; set; }
        public string nickUser { get; set; }
        public string passwordUser { get; set; }
        public Nullable<System.DateTime> fechaUser { get; set; }
    }
}
