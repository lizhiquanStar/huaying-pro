import User from './modules/user.store';

export default {
  state: {
    ...User.state
  },
  mutations: {
    ...User.mutations
  },
  actions: {
    ...User.actions
  }
};
