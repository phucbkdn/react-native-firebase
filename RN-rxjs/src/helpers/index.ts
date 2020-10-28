import { CategoryModel } from '../models'
/**
 * Function increment
 * @param id {string}
 * @param categories {CategoryModel[]}
 */
export const incr = (id: string, categories: CategoryModel[]) =>
  categories.map((item) =>
    item.id === id ? { ...item, count: item.count + 1 } : item
  )

/**
 * Function decrement
 * @param id {string}
 * @param categories {CategoryModel[]}
 */
export const decr = (id: string, categories: CategoryModel[]) =>
  categories.map((item) =>
    item.id === id ? { ...item, count: item.count - 1 } : item
  )
