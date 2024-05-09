enum StatusCode {
    OK = 200,
    CREATED = 201
}

enum StatusMessage {
    OK = 'OK',
    CREATED = 'CREATED'
}

interface ResponseMetadata {
    [key: string]: any;
}

interface ResponsePayload {
    message?: string;
    status?: number;
    metadata?: ResponseMetadata;
}

class SuccessResponse {
    message: string;
    status: number;
    metadata: ResponseMetadata;

    constructor({ message = StatusMessage.OK, status = StatusCode.OK, metadata = {} }: ResponsePayload) {
        this.message = message;
        this.status = status;
        this.metadata = metadata;
    }
}

export class OK extends SuccessResponse {
    constructor({ message = StatusMessage.OK, status = StatusCode.OK, metadata }: ResponsePayload) {
        super({ message, status, metadata });
    }
}

export class CREATED extends SuccessResponse {
    constructor({ message = StatusMessage.CREATED, status = StatusCode.CREATED, metadata }: ResponsePayload) {
        super({ message, status, metadata });
    }
}
