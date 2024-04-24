using BuildABear.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace BuildABear.Core.DataTransferObjects;

public class OrderAddDTO
{
    public PaymentMethod PaymentMethod { get; set; } = default!;
    public string Address { get; set; } = default!;

    public string compute_sku(Guid UserId, DateTime CreatedAt)
    {
        return Address.Substring(0, 3) + "-" + UserId.ToString() + "-" + CreatedAt.ToString().Substring(0, 5);
    }
}
