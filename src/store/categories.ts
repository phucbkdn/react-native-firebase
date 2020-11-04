import { BehaviorSubject } from 'rxjs';
import { scan, map } from 'rxjs/operators';
import { incr, decr } from '../helpers';
import { db } from '../services/firebaseAccess';
import { collectionData } from 'rxfire/firestore';
import { CategoryModel } from '../models';

interface CategoryType extends CategoryModel {
  id: string;
  _key: string;
}

type ActionType = {
  value: string;
  type: string;
};

type StateType = {
  categories: Array<CategoryType>;
  discount: number;
};

const categoriesService = new (class CategoriesService {
  // Type
  store: any;
  dispatcher: any;

  static DECR = 'DECR';
  static INCR = 'INCR';
  static DISCOUNT = 'DISCOUNT';
  static GET_CATEGORIES = 'GET_CATEGORIES';

  constructor() {
    this.dispatcher = new BehaviorSubject<StateType>({
      categories: [],
      discount: 0,
    });
    this.store = this.dispatcher.pipe(
      scan(this.reducer, { categories: [], discount: 0 })
    );
  }

  reducer(state: StateType, action: ActionType) {
    switch (action.type) {
      case CategoriesService.INCR:
        return {
          ...state,
          categories: incr(action.value, state.categories),
        };

      case CategoriesService.DECR:
        return {
          ...state,
          categories: decr(action.value, state.categories),
        };

      case CategoriesService.DISCOUNT:
        return {
          ...state,
          discount: action.value,
        };

      case CategoriesService.GET_CATEGORIES:
        return {
          ...state,
          categories: action.value,
        };

      default:
        return state;
    }
  }

  decr(id: string) {
    this.dispatcher.next({ type: CategoriesService.DECR, value: id });
  }

  incr(id: string) {
    this.dispatcher.next({ type: CategoriesService.INCR, value: id });
  }

  discount(value: number) {
    this.dispatcher.next({ type: CategoriesService.DISCOUNT, value });
  }

  getCategories() {
    const ref = db.collection('categories');

    collectionData(ref, '_key')
      .pipe(
        map((changes) =>
          changes.map((snapshot) => {
            return {
              ...snapshot,
              count: 0,
            };
          })
        )
      )
      .subscribe((list) => {
        this.dispatcher.next({
          type: CategoriesService.GET_CATEGORIES,
          value: list,
        });
      });
  }

  getStore() {
    return this.store;
  }
})();

export default categoriesService;
