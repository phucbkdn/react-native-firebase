export const incr = (id: string, categories: any) => categories.map(item => item.id === id ? { ...item, count: item.count + 1} : item)

export const decr = (id: string, categories: any) => categories.map(item => item.id === id ? { ...item, count: item.count + 1} : item)
