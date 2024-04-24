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
  GuidRequestResponse,
  RequestResponse,
  TeddyBuildDTO,
  TeddyBuildDTORequestResponse,
  TeddyUpdateDTO,
} from '../models';
import {
    GuidRequestResponseFromJSON,
    GuidRequestResponseToJSON,
    RequestResponseFromJSON,
    RequestResponseToJSON,
    TeddyBuildDTOFromJSON,
    TeddyBuildDTOToJSON,
    TeddyBuildDTORequestResponseFromJSON,
    TeddyBuildDTORequestResponseToJSON,
    TeddyUpdateDTOFromJSON,
    TeddyUpdateDTOToJSON,
} from '../models';

export interface ApiTeddyBuildPostRequest {
    teddyBuildDTO?: TeddyBuildDTO;
}

export interface ApiTeddyDeleteIdDeleteRequest {
    id: string;
}

export interface ApiTeddyGetIdGetRequest {
    id: string;
}

export interface ApiTeddyUpdateIdPutRequest {
    id: string;
    teddyUpdateDTO?: TeddyUpdateDTO;
}

/**
 * 
 */
export class TeddyApi extends runtime.BaseAPI {

    /**
     */
    async apiTeddyBuildPostRaw(requestParameters: ApiTeddyBuildPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GuidRequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Teddy/Build`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TeddyBuildDTOToJSON(requestParameters.teddyBuildDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GuidRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiTeddyBuildPost(requestParameters: ApiTeddyBuildPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GuidRequestResponse> {
        const response = await this.apiTeddyBuildPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiTeddyDeleteIdDeleteRaw(requestParameters: ApiTeddyDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiTeddyDeleteIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Teddy/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiTeddyDeleteIdDelete(requestParameters: ApiTeddyDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiTeddyDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiTeddyGetIdGetRaw(requestParameters: ApiTeddyGetIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TeddyBuildDTORequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiTeddyGetIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Teddy/Get/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TeddyBuildDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiTeddyGetIdGet(requestParameters: ApiTeddyGetIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TeddyBuildDTORequestResponse> {
        const response = await this.apiTeddyGetIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiTeddyUpdateIdPutRaw(requestParameters: ApiTeddyUpdateIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GuidRequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiTeddyUpdateIdPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Teddy/Update/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: TeddyUpdateDTOToJSON(requestParameters.teddyUpdateDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GuidRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiTeddyUpdateIdPut(requestParameters: ApiTeddyUpdateIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GuidRequestResponse> {
        const response = await this.apiTeddyUpdateIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
