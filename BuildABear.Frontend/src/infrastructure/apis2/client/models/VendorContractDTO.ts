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
import type { VendorContractRenewalTerms } from './VendorContractRenewalTerms';
import {
    VendorContractRenewalTermsFromJSON,
    VendorContractRenewalTermsFromJSONTyped,
    VendorContractRenewalTermsToJSON,
} from './VendorContractRenewalTerms';

/**
 * 
 * @export
 * @interface VendorContractDTO
 */
export interface VendorContractDTO {
    /**
     * 
     * @type {Date}
     * @memberof VendorContractDTO
     */
    contractStartDate?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof VendorContractDTO
     */
    contractEndDate?: Date | null;
    /**
     * 
     * @type {PaymentMethod}
     * @memberof VendorContractDTO
     */
    paymentMethod?: PaymentMethod;
    /**
     * 
     * @type {VendorContractRenewalTerms}
     * @memberof VendorContractDTO
     */
    contractRenewalTerms?: VendorContractRenewalTerms;
}

/**
 * Check if a given object implements the VendorContractDTO interface.
 */
export function instanceOfVendorContractDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function VendorContractDTOFromJSON(json: any): VendorContractDTO {
    return VendorContractDTOFromJSONTyped(json, false);
}

export function VendorContractDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): VendorContractDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'contractStartDate': !exists(json, 'contractStartDate') ? undefined : (json['contractStartDate'] === null ? null : new Date(json['contractStartDate'])),
        'contractEndDate': !exists(json, 'contractEndDate') ? undefined : (json['contractEndDate'] === null ? null : new Date(json['contractEndDate'])),
        'paymentMethod': !exists(json, 'paymentMethod') ? undefined : PaymentMethodFromJSON(json['paymentMethod']),
        'contractRenewalTerms': !exists(json, 'contractRenewalTerms') ? undefined : VendorContractRenewalTermsFromJSON(json['contractRenewalTerms']),
    };
}

export function VendorContractDTOToJSON(value?: VendorContractDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'contractStartDate': value.contractStartDate === undefined ? undefined : (value.contractStartDate === null ? null : value.contractStartDate.toISOString()),
        'contractEndDate': value.contractEndDate === undefined ? undefined : (value.contractEndDate === null ? null : value.contractEndDate.toISOString()),
        'paymentMethod': PaymentMethodToJSON(value.paymentMethod),
        'contractRenewalTerms': VendorContractRenewalTermsToJSON(value.contractRenewalTerms),
    };
}

