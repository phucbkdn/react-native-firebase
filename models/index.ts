export type TableModel = {
  name: string,
  active: Boolean,
  _key: string
}

export type CategoryModel = {
  name: string,
  price: number,
  count: number,
  id?: string,
  _key?: string,
}

export type OrderType = {
  id: string,
  Price: string,
  _key: string,
}
