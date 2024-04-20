using Ardalis.SmartEnum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildABear.Core.Enums;
public sealed class TeddyItemValability : SmartEnum<TeddyItemValability, string>
{
    public static readonly TeddyItemValability Available = new(nameof(Available), "Available");
    public static readonly TeddyItemValability OutOfStock = new(nameof(OutOfStock), "Out of stock");
    public static readonly TeddyItemValability LowStock = new(nameof(LowStock), "Low stock");
    private TeddyItemValability(string name, string value) : base(name, value)
    {
    }
}

