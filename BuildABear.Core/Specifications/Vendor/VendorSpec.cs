using Ardalis.Specification;
using BuildABear.Core.Entities;
namespace BuildABear.Core.Specifications;

public class VendorSpec : BaseSpec<VendorSpec, Vendor>
{
    public VendorSpec(string email) {
        Query.Where(e => e.Email == email);
    }

    public VendorSpec(Guid id) {
        Query.Where(e => e.Id == id);
    }
}
