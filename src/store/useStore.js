import { create } from "zustand";

const useStore = create((set, get) => ({
  itemCache: {},
  userCache: {},

  setItem: (item) =>
    set((s) => ({ itemCache: { ...s.itemCache, [item.id]: item } })),

  setUser: (user) =>
    set((s) => ({ userCache: { ...s.userCache, [user.id]: user } })),

  getItem: (id) => get().itemCache[id],
  getUser: (id) => get().userCache[id],

  feeds: {},
  setFeed: (feedKey, data) =>
    set((s) => ({ feeds: { ...s.feeds, [feedKey]: data } })),
  getFeed: (feedKey) => get().feeds[feedKey],
}));

export default useStore;