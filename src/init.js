import * as yup from 'yup';
import i18next from 'i18next';
import createWatcher from './view.js';
import ru from '../locales/ru.js';

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

  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    resources: {
      ru,
    },
  });

  const watchedState = createWatcher(state, elements, i18nextInstance);

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
