/**
 * @jest-environment node
 */

import { call } from "typed-redux-saga/macro";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import { throwError } from "redux-saga-test-plan/providers";

//SOLVE TextDecoder error:
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
// @ts-expect-error
global.TextDecoder = TextDecoder

import { categoriesSaga, onFetchCategories, fetchCategoriesAsync } from "../category.saga";
import { CATEGORIES_ACTION_TYPES } from "../category.types";
import { fetchCategoriesFailed, fetchCategoriesSuccess } from "../category.action";

describe('category saga', () => { 
    test('categorySaga', () => {
        //Here we'll test every single thing in saga happends exatly as we coded. so we'll test tha calls the puts and other sagas!
        testSaga(categoriesSaga) //We are testing categoriesSaga
        .next() //Pass to the next yeld
        .all([call(onFetchCategories)]) //test the [call(onFetchCategories)]
        .next()
        .isDone()
    })

    test('onFetchCategories', () => {
        testSaga(onFetchCategories)
        .next()
        .takeLatest(
            CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
            fetchCategoriesAsync
        )
        .next()
        .isDone()
    })

    test('fetchCategoriesAsync success', () => {
        const mockCategoriesArray = [
            {id: 1, name: 'Category 1'},
            {id: 2, name: 'Category 2'},

        ]
        return expectSaga(fetchCategoriesAsync)
        .provide([
            [call(getCategoriesAndDocuments), mockCategoriesArray] //use the mockCategoriesArray instead of the call(getCategoriesAndDocuments effect)
        ])
        .put(fetchCategoriesSuccess(mockCategoriesArray)) //put fetchCategoriesSuccess method passign in the mockCategoriesArray
        .run()
    })

    test('fetchCategoriesAsync failure', () => {
        const mockError = new Error('An error occured')
        return expectSaga(fetchCategoriesAsync)
        .provide([
            [call(getCategoriesAndDocuments), throwError(mockError)]
        ])
        .put(fetchCategoriesFailed(mockError))
        .run()
    })
})