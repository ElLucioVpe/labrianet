using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataTransferObjects
{
    public class DTOBaseResponse
    {
        public bool Success { get; set; }
        public string Error { get; set; }
    }
}
