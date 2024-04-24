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

/**
 * 
 * @export
 * @interface Int32RequestResponse
 */
export interface Int32RequestResponse {
    /**
     * 
     * @type {number}
     * @memberof Int32RequestResponse
     */
    readonly response?: number;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof Int32RequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the Int32RequestResponse interface.
 */
export function instanceOfInt32RequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function Int32RequestResponseFromJSON(json: any): Int32RequestResponse {
    return Int32RequestResponseFromJSONTyped(json, false);
}

export function Int32RequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): Int32RequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : json['response'],
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function Int32RequestResponseToJSON(value?: Int32RequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}

