import { createSelector } from "reselect";

// Initial Selector
const selectCategoryReducer = (state) => {
  console.log('Selector 1 Fired')
  return state.categories
};

// First Memoized Selector
export const selectCategories = createSelector(
  //Input
    [selectCategoryReducer],
  //Output
    (categoriesSlice) => {
      console.log('Selector 2 Fired')
      return categoriesSlice.categories 
    }
)

export const selectCategoriesMap = createSelector(
  //Input
    [selectCategories],
  //Output
    (categories) => {     
      console.log('Selector 3 Fired') 
      return categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
      }, {})
    }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);