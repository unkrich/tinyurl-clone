import { urlConstants } from '../_constants';
import { urlService } from '../_services';
import { alertActions } from './';

export const urlActions = {
    create,
    getOne,
    getAll
};

function create(originalUrl, alias=undefined) {
    return dispatch => {
        dispatch(request(originalUrl));

        urlService.create(originalUrl, alias)
            .then(
                url => dispatch(success(url)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: urlConstants.CREATE_REQUEST } }
    function success(url) { return { type: urlConstants.CREATE_SUCCESS, url } }
    function failure(error) { return { type: urlConstants.CREATE_FAILURE, error } }
}

function getOne(hash) {
    return dispatch => {
        dispatch(request(hash));

        urlService.getOne(hash)
            .then(
                url => dispatch(success(url)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: urlConstants.GETONE_REQUEST } }
    function success(url) { return { type: urlConstants.GETONE_SUCCESS, url } }
    function failure(error) { return { type: urlConstants.GETONE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        urlService.getAll()
            .then(
                urls => dispatch(success(urls)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: urlConstants.GETALL_REQUEST } }
    function success(urls) { return { type: urlConstants.GETALL_SUCCESS, urls } }
    function failure(error) { return { type: urlConstants.GETALL_FAILURE, error } }
}