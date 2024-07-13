/**
 * @jest-environment node
 */

import { call } from "typed-redux-saga/macro";
import { testSaga } from "redux-saga-test-plan";

//SOLVE TextDecoder error:
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
// @ts-expect-error
global.TextDecoder = TextDecoder

import { categoriesSaga, onFetchCategories, fetchCategoriesAsync } from "../category.saga";
import { CATEGORIES_ACTION_TYPES } from "../category.types";

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
})