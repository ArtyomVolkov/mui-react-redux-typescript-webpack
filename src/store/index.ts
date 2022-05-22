import { configureStore } from '@reduxjs/toolkit';

import app from './reducers/app';

export default configureStore({
  reducer: {
    app,
  }
});
