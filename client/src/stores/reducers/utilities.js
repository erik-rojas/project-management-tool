import produce from 'immer'

export const createProducer = (initialState, handlers) =>
  (state = initialState, action) =>
    produce(state, draft => {
      let type = action.type
      let [prefix, /* event, apiState */] = type.split("/")
      let any = prefix + "/any"
      type !== any && handlers[any] && handlers[any](draft, action);
      // handlers[prefix+"/"+event] && handlers[prefix+"/"+event](draft,action);
      return handlers[type] && handlers[type](draft, action)
    })
