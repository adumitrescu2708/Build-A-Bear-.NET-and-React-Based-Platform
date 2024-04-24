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


import * as runtime from '../runtime';
import type {
  RequestResponse,
  VendorAddDTO,
  VendorBriefViewPagedResponseRequestResponse,
  VendorBriefViewRequestResponse,
  VendorContractDTO,
  VendorContractDTORequestResponse,
  VendorEmail,
  VendorViewDTORequestResponse,
} from '../models';
import {
    RequestResponseFromJSON,
    RequestResponseToJSON,
    VendorAddDTOFromJSON,
    VendorAddDTOToJSON,
    VendorBriefViewPagedResponseRequestResponseFromJSON,
    VendorBriefViewPagedResponseRequestResponseToJSON,
    VendorBriefViewRequestResponseFromJSON,
    VendorBriefViewRequestResponseToJSON,
    VendorContractDTOFromJSON,
    VendorContractDTOToJSON,
    VendorContractDTORequestResponseFromJSON,
    VendorContractDTORequestResponseToJSON,
    VendorEmailFromJSON,
    VendorEmailToJSON,
    VendorViewDTORequestResponseFromJSON,
    VendorViewDTORequestResponseToJSON,
} from '../models';

export interface ApiVendorAddPostRequest {
    vendorAddDTO?: VendorAddDTO;
}

export interface ApiVendorDeleteIdDeleteRequest {
    id: string;
}

export interface ApiVendorGetByEmailGetRequest {
    vendorEmail?: VendorEmail;
}

export interface ApiVendorGetByIdIdGetRequest {
    id: string;
}

export interface ApiVendorGetContractByIdIdGetRequest {
    id: string;
}

export interface ApiVendorGetGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiVendorUpdateContractByIdIdPutRequest {
    id: string;
    vendorContractDTO?: VendorContractDTO;
}

/**
 * 
 */
export class VendorApi extends runtime.BaseAPI {

    /**
     */
    async apiVendorAddPostRaw(requestParameters: ApiVendorAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<VendorViewDTORequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Vendor/Add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: VendorAddDTOToJSON(requestParameters.vendorAddDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => VendorViewDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiVendorAddPost(requestParameters: ApiVendorAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<VendorViewDTORequestResponse> {
        const response = await this.apiVendorAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiVendorDeleteIdDeleteRaw(requestParameters: ApiVendorDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiVendorDeleteIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Vendor/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiVendorDeleteIdDelete(requestParameters: ApiVendorDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiVendorDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiVendorGetByEmailGetRaw(requestParameters: ApiVendorGetByEmailGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<VendorBriefViewRequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Vendor/GetByEmail`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
            body: VendorEmailToJSON(requestParameters.vendorEmail),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => VendorBriefViewRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiVendorGetByEmailGet(requestParameters: ApiVendorGetByEmailGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<VendorBriefViewRequestResponse> {
        const response = await this.apiVendorGetByEmailGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiVendorGetByIdIdGetRaw(requestParameters: ApiVendorGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<VendorBriefViewRequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiVendorGetByIdIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Vendor/GetById/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => VendorBriefViewRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiVendorGetByIdIdGet(requestParameters: ApiVendorGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<VendorBriefViewRequestResponse> {
        const response = await this.apiVendorGetByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiVendorGetContractByIdIdGetRaw(requestParameters: ApiVendorGetContractByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<VendorContractDTORequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiVendorGetContractByIdIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Vendor/GetContractById/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => VendorContractDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiVendorGetContractByIdIdGet(requestParameters: ApiVendorGetContractByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<VendorContractDTORequestResponse> {
        const response = await this.apiVendorGetContractByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiVendorGetGetRaw(requestParameters: ApiVendorGetGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<VendorBriefViewPagedResponseRequestResponse>> {
        const queryParameters: any = {};

        if (requestParameters.search !== undefined) {
            queryParameters['Search'] = requestParameters.search;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['Page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['PageSize'] = requestParameters.pageSize;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Vendor/Get`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => VendorBriefViewPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiVendorGetGet(requestParameters: ApiVendorGetGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<VendorBriefViewPagedResponseRequestResponse> {
        const response = await this.apiVendorGetGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiVendorUpdateContractByIdIdPutRaw(requestParameters: ApiVendorUpdateContractByIdIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiVendorUpdateContractByIdIdPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Vendor/UpdateContractById/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: VendorContractDTOToJSON(requestParameters.vendorContractDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiVendorUpdateContractByIdIdPut(requestParameters: ApiVendorUpdateContractByIdIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiVendorUpdateContractByIdIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
