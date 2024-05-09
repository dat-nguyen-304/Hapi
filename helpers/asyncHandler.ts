import * as Hapi from '@hapi/hapi';

const asyncHandler = (fn:  (request: Hapi.Request<Hapi.ReqRefDefaults>, h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>) => Promise<void>)=> {
    return (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        fn(request, h).catch(() => h.continue);
    }
}

module.exports = asyncHandler

