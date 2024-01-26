import { cloneDeep, Dictionary, keyBy, merge, uniqueId } from "lodash";
import { DeepPartial } from "@/lib/utils/deep-partial";

export class ListStore<T extends { id: string|number }>  {
  protected _items: T[];
  protected _itemsById: Dictionary<T>

  get items(): T[] {
    return this._items;
  }

  get byId(): Dictionary<T> {
    return this._itemsById
  }

  setItems(items: T[]) {
    this._items = items
    this._itemsById = keyBy(this._items, 'id')
  }

  upsert(item: T) {
    if (!this._items) {
      this._items = [item]
      this._itemsById = {[item.id]: item}

      return item
    }
    const t = this._items.find((t) => t.id === item.id);
    if (t) {
      merge(t, item)

      return t
    } else {
      this._items.push(item);
      this._itemsById[item.id] = item

      return item
    }
  }

  upsertMany(items: T[]) {
    items.forEach(i => this.upsert(i))
  }

  protected async _performOptimisticCreate(
    item: Partial<T>,
    actualizer: () => Promise<T>,
    onOptimisticItemCreated: null|((optimistic: T) => void) = null,
    onActualized: null|((actual: T) => void) = null,
    onActualizedError: null|((error: any) => void) = null,
  ) {
    // start by adding an optimistic model to items
    const optimisticId = uniqueId('op-')
    const optimistic = this.upsert({
      ...item,
      id: optimisticId,
    } as T)
    if (onOptimisticItemCreated) {
      onOptimisticItemCreated(optimistic)
    }

    // now, let's run the actualizer and swap the optimistic model for the actual model
    let actual
    try {
      actual = await actualizer()
    } catch (e) {
      // if we fail to actualize, remove the optimistic item
      this.remove(optimisticId)
      if (onActualizedError) {
        onActualizedError(e)
        return
      } else {
        throw e
      }
    }

    actual = this._replaceOptimisticItemForActual(optimisticId, actual)
    if (onActualized) {
      onActualized(actual)
    }

    return actual
  }

  private _replaceOptimisticItemForActual(optimisticId: string, actual: T) {
    const t = this._items.find((t) => t.id === optimisticId);
    if (!t) {
      throw "Optimistic item not found"
    }
    Object.assign(t, actual)
    delete this._itemsById[optimisticId]
    this._itemsById[actual.id] = t

    return t
  }

  protected async _performOptimisticUpdate(
    id: T['id'],
    item: DeepPartial<T>,
    actualizer: () => Promise<T>,
    onActualized: null|((actual: T) => void) = null,
    onError: null|((error: any) => void) = null
  ) {
    const original = cloneDeep(this.byId[id])
    // update data in store with updated values
    this.upsert({
      id,
      ...item
    } as T)

    // now, let's run the actualizer and update the optimistic item with actual data
    let actual
    try {
      actual = await actualizer()
    } catch (e) {
      // rollback to original value on error
      this.upsert(original)
      if (onError) {
        onError(e)
        return
      } else {
        throw e
      }
    }

    actual = this.upsert(actual)
    if (onActualized) {
      onActualized(actual)
    }

    return actual
  }

  protected async _performOptimisticDelete(id: T['id'], remover: () => Promise<void>, onRemoved: null|(() => void), onError: null|((error: any) => void) = null) {
    const item = this.byId[id]
    this.remove(id)
    try {
      await remover()
    } catch (e) {
      this.upsert(item)
      if (onError) {
        onError(e)
        return
      } else {
        throw e
      }
    }
    if (onRemoved) {
      onRemoved()
    }
  }

  remove(id: T['id']) {
    this._items = this._items.filter((t) => t.id !== id);
    delete this._itemsById[id]
  }
}
