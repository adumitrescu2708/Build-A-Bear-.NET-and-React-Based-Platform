using BuildABear.Core.Enums;
using BuildABear.Core.Errors;
using System.ComponentModel.DataAnnotations;
namespace BuildABear.Core.DataTransferObjects;


public class VendorAddDTO
{
    public string Name { get; set; } = default!;
    [EmailAddress(ErrorMessage = "Invalid mail address format")]
    public string Email { get; set; } = default!;
    public string Address { get; set; } = default!;

    [Phone(ErrorMessage = "Invalid Phone number")]
    public string PhoneNumber { get; set; } = default!;


    [DataType(DataType.Date, ErrorMessage = "Invalid date format!")]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
    public DateTime ContractStartDate { get; set; } = default!;


    [DataType(DataType.Date, ErrorMessage = "Invalid date format!")]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
    public DateTime ContractEndDate { get; set; } = default!;

    public PaymentMethod PaymentMethod { get; set; } = default!;

    
    public VendorContractRenewalTerms ContractRenewalTerms { get; set; } = default!;
}
