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
import type { PaymentMethod } from './PaymentMethod';
import {
    PaymentMethodFromJSON,
    PaymentMethodFromJSONTyped,
    PaymentMethodToJSON,
} from './PaymentMethod';

/**
 * 
 * @export
 * @interface OrderAddDTO
 */
export interface OrderAddDTO {
    /**
     * 
     * @type {PaymentMethod}
     * @memberof OrderAddDTO
     */
    paymentMethod?: PaymentMethod;
    /**
     * 
     * @type {string}
     * @memberof OrderAddDTO
     */
    address?: string | null;
}

/**
 * Check if a given object implements the OrderAddDTO interface.
 */
export function instanceOfOrderAddDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function OrderAddDTOFromJSON(json: any): OrderAddDTO {
    return OrderAddDTOFromJSONTyped(json, false);
}

export function OrderAddDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderAddDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'paymentMethod': !exists(json, 'paymentMethod') ? undefined : PaymentMethodFromJSON(json['paymentMethod']),
        'address': !exists(json, 'address') ? undefined : json['address'],
    };
}

export function OrderAddDTOToJSON(value?: OrderAddDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'paymentMethod': PaymentMethodToJSON(value.paymentMethod),
        'address': value.address,
    };
}

