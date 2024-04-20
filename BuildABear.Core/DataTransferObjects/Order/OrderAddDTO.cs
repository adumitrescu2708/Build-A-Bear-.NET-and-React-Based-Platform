using BuildABear.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildABear.Core.DataTransferObjects;

public class OrderAddDTO
{
    public PaymentMethod PaymentMethod { get; set; } = default!;
    public string Address { get; set; } = default!;
}
