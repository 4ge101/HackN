import { create } from "zustand";

const useStore = create((set, get) => ({
  itemCache: {},
  userCache: {},

  setItem: (item) => {
    if (!item) return;
    set((s) => ({ itemCache: { ...s.itemCache, [item.id]: item } }));
  },

  cacheUser: (user) => {
    if (!user) return;
    set((s) => ({ userCache: { ...s.userCache, [user.id]: user } }));
  },

  getItem: (id) => get().itemCache[id],
  getCachedUser: (id) => get().userCache[id],

  feeds: {},
  setFeed: (feedKey, data) =>
    set((s) => ({ feeds: { ...s.feeds, [feedKey]: data } })),
  getFeed: (feedKey) => get().feeds[feedKey],
}));

export default useStore;
``