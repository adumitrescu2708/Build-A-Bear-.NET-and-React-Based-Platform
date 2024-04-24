/* tslint:disable */
/* eslint-disable */
/**
 * Build a bear Web App
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';
import type { VendorViewDTO } from './VendorViewDTO';
import {
    VendorViewDTOFromJSON,
    VendorViewDTOFromJSONTyped,
    VendorViewDTOToJSON,
} from './VendorViewDTO';

/**
 * 
 * @export
 * @interface VendorViewDTORequestResponse
 */
export interface VendorViewDTORequestResponse {
    /**
     * 
     * @type {VendorViewDTO}
     * @memberof VendorViewDTORequestResponse
     */
    response?: VendorViewDTO;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof VendorViewDTORequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the VendorViewDTORequestResponse interface.
 */
export function instanceOfVendorViewDTORequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function VendorViewDTORequestResponseFromJSON(json: any): VendorViewDTORequestResponse {
    return VendorViewDTORequestResponseFromJSONTyped(json, false);
}

export function VendorViewDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): VendorViewDTORequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : VendorViewDTOFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function VendorViewDTORequestResponseToJSON(value?: VendorViewDTORequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': VendorViewDTOToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}

