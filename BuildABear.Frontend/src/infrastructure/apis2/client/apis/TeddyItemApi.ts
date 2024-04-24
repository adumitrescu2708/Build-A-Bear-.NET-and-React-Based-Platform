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
  BriefTeddyItemDTOPagedResponseRequestResponse,
  BriefTeddyItemDTORequestResponse,
  RequestResponse,
  TeddyItemCategoryEnum,
  TeddyItemDTORequestResponse,
  TeddyItemUpdateDTO,
  TeddyItemViewDTORequestResponse,
  TeddySkuDTO,
} from '../models';
import {
    BriefTeddyItemDTOPagedResponseRequestResponseFromJSON,
    BriefTeddyItemDTOPagedResponseRequestResponseToJSON,
    BriefTeddyItemDTORequestResponseFromJSON,
    BriefTeddyItemDTORequestResponseToJSON,
    RequestResponseFromJSON,
    RequestResponseToJSON,
    TeddyItemCategoryEnumFromJSON,
    TeddyItemCategoryEnumToJSON,
    TeddyItemDTORequestResponseFromJSON,
    TeddyItemDTORequestResponseToJSON,
    TeddyItemUpdateDTOFromJSON,
    TeddyItemUpdateDTOToJSON,
    TeddyItemViewDTORequestResponseFromJSON,
    TeddyItemViewDTORequestResponseToJSON,
    TeddySkuDTOFromJSON,
    TeddySkuDTOToJSON,
} from '../models';

export interface ApiTeddyItemAddPostRequest {
    name?: string;
    price?: number;
    description?: string;
    fabric?: string;
    color?: string;
    quantity?: number;
    category?: TeddyItemCategoryEnum;
    file?: Blob;
    fileName?: string;
}

export interface ApiTeddyItemDeleteIdDeleteRequest {
    id: string;
}

export interface ApiTeddyItemGetByCategoryGetRequest {
    category?: TeddyItemCategoryEnum;
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiTeddyItemGetBySKUGetRequest {
    teddySkuDTO?: TeddySkuDTO;
}

export interface ApiTeddyItemGetByVendorGetRequest {
    id?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiTeddyItemGetFileByIdIdGetRequest {
    id: string;
}

export interface ApiTeddyItemGetGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiTeddyItemGetInfoByIdIdGetRequest {
    id: string;
}

export interface ApiTeddyItemUpdatePutRequest {
    teddyItemUpdateDTO?: TeddyItemUpdateDTO;
}

/**
 * 
 */
export class TeddyItemApi extends runtime.BaseAPI {

    /**
     */
    async apiTeddyItemAddPostRaw(requestParameters: ApiTeddyItemAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TeddyItemViewDTORequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.name !== undefined) {
            formParams.append('Name', requestParameters.name as any);
        }

        if (requestParameters.price !== undefined) {
            formParams.append('Price', requestParameters.price as any);
        }

        if (requestParameters.description !== undefined) {
            formParams.append('Description', requestParameters.description as any);
        }

        if (requestParameters.fabric !== undefined) {
            formParams.append('Fabric', requestParameters.fabric as any);
        }

        if (requestParameters.color !== undefined) {
            formParams.append('Color', requestParameters.color as any);
        }

        if (requestParameters.quantity !== undefined) {
            formParams.append('Quantity', requestParameters.quantity as any);
        }

        if (requestParameters.category !== undefined) {
            formParams.append('Category', new Blob([JSON.stringify(TeddyItemCategoryEnumToJSON(requestParameters.category))], { type: "application/json", }));
                    }

        if (requestParameters.file !== undefined) {
            formParams.append('File', requestParameters.file as any);
        }

        if (requestParameters.fileName !== undefined) {
            formParams.append('FileName', requestParameters.fileName as any);
        }

        const response = await this.request({
            path: `/api/TeddyItem/Add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TeddyItemViewDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiTeddyItemAddPost(requestParameters: ApiTeddyItemAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TeddyItemViewDTORequestResponse> {
        const response = await this.apiTeddyItemAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiTeddyItemDeleteIdDeleteRaw(requestParameters: ApiTeddyItemDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiTeddyItemDeleteIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/TeddyItem/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiTeddyItemDeleteIdDelete(requestParameters: ApiTeddyItemDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiTeddyItemDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiTeddyItemGetByCategoryGetRaw(requestParameters: ApiTeddyItemGetByCategoryGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BriefTeddyItemDTOPagedResponseRequestResponse>> {
        const queryParameters: any = {};

        if (requestParameters.category !== undefined) {
            queryParameters['category'] = requestParameters.category;
        }

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
            path: `/api/TeddyItem/GetByCategory`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BriefTeddyItemDTOPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiTeddyItemGetByCategoryGet(requestParameters: ApiTeddyItemGetByCategoryGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BriefTeddyItemDTOPagedResponseRequestResponse> {
        const response = await this.apiTeddyItemGetByCategoryGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiTeddyItemGetBySKUGetRaw(requestParameters: ApiTeddyItemGetBySKUGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TeddyItemDTORequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/TeddyItem/GetBySKU`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
            body: TeddySkuDTOToJSON(requestParameters.teddySkuDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TeddyItemDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiTeddyItemGetBySKUGet(requestParameters: ApiTeddyItemGetBySKUGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TeddyItemDTORequestResponse> {
        const response = await this.apiTeddyItemGetBySKUGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiTeddyItemGetByVendorGetRaw(requestParameters: ApiTeddyItemGetByVendorGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BriefTeddyItemDTOPagedResponseRequestResponse>> {
        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
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
            path: `/api/TeddyItem/GetByVendor`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BriefTeddyItemDTOPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiTeddyItemGetByVendorGet(requestParameters: ApiTeddyItemGetByVendorGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BriefTeddyItemDTOPagedResponseRequestResponse> {
        const response = await this.apiTeddyItemGetByVendorGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiTeddyItemGetFileByIdIdGetRaw(requestParameters: ApiTeddyItemGetFileByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Blob>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiTeddyItemGetFileByIdIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/TeddyItem/GetFileById/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.BlobApiResponse(response);
    }

    /**
     */
    async apiTeddyItemGetFileByIdIdGet(requestParameters: ApiTeddyItemGetFileByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Blob> {
        const response = await this.apiTeddyItemGetFileByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiTeddyItemGetGetRaw(requestParameters: ApiTeddyItemGetGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BriefTeddyItemDTOPagedResponseRequestResponse>> {
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
            path: `/api/TeddyItem/Get`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BriefTeddyItemDTOPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiTeddyItemGetGet(requestParameters: ApiTeddyItemGetGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BriefTeddyItemDTOPagedResponseRequestResponse> {
        const response = await this.apiTeddyItemGetGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiTeddyItemGetInfoByIdIdGetRaw(requestParameters: ApiTeddyItemGetInfoByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BriefTeddyItemDTORequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiTeddyItemGetInfoByIdIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/TeddyItem/GetInfoById/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BriefTeddyItemDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiTeddyItemGetInfoByIdIdGet(requestParameters: ApiTeddyItemGetInfoByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BriefTeddyItemDTORequestResponse> {
        const response = await this.apiTeddyItemGetInfoByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiTeddyItemUpdatePutRaw(requestParameters: ApiTeddyItemUpdatePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/TeddyItem/Update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: TeddyItemUpdateDTOToJSON(requestParameters.teddyItemUpdateDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiTeddyItemUpdatePut(requestParameters: ApiTeddyItemUpdatePutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiTeddyItemUpdatePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
