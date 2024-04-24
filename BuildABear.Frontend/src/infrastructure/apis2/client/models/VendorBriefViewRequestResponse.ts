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
import type { VendorBriefView } from './VendorBriefView';
import {
    VendorBriefViewFromJSON,
    VendorBriefViewFromJSONTyped,
    VendorBriefViewToJSON,
} from './VendorBriefView';

/**
 * 
 * @export
 * @interface VendorBriefViewRequestResponse
 */
export interface VendorBriefViewRequestResponse {
    /**
     * 
     * @type {VendorBriefView}
     * @memberof VendorBriefViewRequestResponse
     */
    response?: VendorBriefView;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof VendorBriefViewRequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the VendorBriefViewRequestResponse interface.
 */
export function instanceOfVendorBriefViewRequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function VendorBriefViewRequestResponseFromJSON(json: any): VendorBriefViewRequestResponse {
    return VendorBriefViewRequestResponseFromJSONTyped(json, false);
}

export function VendorBriefViewRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): VendorBriefViewRequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : VendorBriefViewFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function VendorBriefViewRequestResponseToJSON(value?: VendorBriefViewRequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': VendorBriefViewToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}

