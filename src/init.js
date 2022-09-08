import * as yup from 'yup';
import createWatchedState from './view.js';

const elements = {
  form: document.querySelector('form'),
  input: document.querySelector('#url-input'),
  feedback: document.querySelector('.feedback'),
};

export default () => {
  const state = {
    status: 'filling', // success, fail
    urls: [],
    error: null, // invalidURL, notUniqURL
  };

  const watchedState = createWatchedState(state, elements);

  yup.setLocale({
    mixed: {
      notOneOf: 'notUniqURL',
    },
    string: {
      url: 'invalidURL',
    },
  });

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get('url').trim();
    const schema = yup.string().url().notOneOf(watchedState.urls);
    schema
      .validate(value)
      .then((url) => {
        watchedState.status = 'success';
        watchedState.error = null;
        watchedState.urls.push(url);
      })
      .catch((error) => {
        watchedState.status = 'fail';
        watchedState.error = error.message;
      });
  });
};
