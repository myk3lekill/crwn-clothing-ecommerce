import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { createAction } from "../../utils/firebase/reducer/reducer.utils";

export const setCategoryMap = (categoriesMap) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP)