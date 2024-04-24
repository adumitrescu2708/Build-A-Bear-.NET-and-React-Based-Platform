using System.Text.Json.Serialization;

namespace BuildABear.Core.Errors;

/// <summary>
/// This enumeration represents codes for common errors and should be used to better identify the error by the client. You may add or remove codes as you see fit.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ErrorCodes
{
    Unknown,
    TechnicalError,
    EntityNotFound,
    PhysicalFileNotFound,
    UserAlreadyExists,
    WrongPassword,
    CannotAdd,
    CannotAddVendor,
    CannotGet,
    CannotUpdate,
    CannotDelete,
    MailSendFailed,
    CannotAddItem,
    CannotUpdateItem,
    VendorAlreadyExists,
    CannotDeleteVendorUnderContract,
    CannotViewContract,
    CannotAddVendorUserWithoutVendor,
    ContractExpired,
    UnpermittedVendorSpecification,
    ItemAlreadyExists,
    ItemNotFound,
    CannotAddTeddyTemplate,
    TeddyTemplateNameAlreadyExists,
    CannotRemoveTeddyTemplate,
    TeddyTemplateNotFound,
    NonexistingTemplate,
    CartNotFound,
    TeddyNotExisting,
    CannotUpdateTeddy,
    CannotViewTeddy,
    CannotDeleteTeddy,
    CartNotExisting,
    CannotViewCart,
    UserNotFound,
    CannotViewOrder,
    OrderNotFound,
    CannotUpdateOrder,
    CannotOrderEmptyCart,
    VendorNotFound,
    CannotAddFile,
    CannotDeleteItem,
    ItemUnavailable,
    CannotViewUser
}
