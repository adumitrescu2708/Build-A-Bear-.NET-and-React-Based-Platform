using BuildABear.Core.Entities;
using BuildABear.Core.Enums;

namespace BuildABear.Core.Helpers;


public sealed class Helpers
{
    readonly static int TRESHOLD = 100;
    public static bool isValidDate(DateTime currentDate, DateTime start, DateTime end) {
        return currentDate >= start && currentDate <= end;
    }

    public static TeddyItemValability computeValability(int quantity) { 
        if(quantity < 0) { return TeddyItemValability.OutOfStock; }
        if(quantity < TRESHOLD) { return TeddyItemValability.LowStock; }
        return TeddyItemValability.Available;
    }

    public static int ComputePrice(ICollection<Teddy>? Products)
    {
        if (Products == null)
            return 0;

        int totalSum = 0;
        foreach (var teddy in Products)
        {
            if (teddy.Items != null)
            {
                foreach (var teddyItem in teddy.Items)
                {
                    totalSum += teddyItem.Price;
                }
            }
        }
        return totalSum;
    }
}
