using BuildABear.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildABear.Core.DataTransferObjects;

public class BriefUserDTO
{
    public string Name { get; set; } = default!;
    public Guid Id { get; set; } = default!;
    public string Email { get; set; } = default!;
    public UserRoleEnum Role { get; set; } = default!;
}
