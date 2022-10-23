import { ApiResponse } from "@core/response.core";
import { DataResponses, StatusCode, Success } from "@utils/";

/**
 * @class sends success response to client
 */
export class SuccessResponse<T extends DataResponses> extends ApiResponse{
    constructor(message: string, data?: T) {
        super()
        this.success = Success.SUCCESS;
        this.status_code = StatusCode.SUCCESS;
        this.message = message;
        this.data = data;
        this.prepare<SuccessResponse<T>>(this);        
    }
}