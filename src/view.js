import onChange from 'on-change';

const feedbackTexts = {
  success: 'RSS успешно загружен',
  invalidURL: 'Ссылка должна быть валидным URL',
  notUniqURL: 'RSS уже существует',
  unknown: 'Что-то пошло не так',
};

export default (state, elements) => onChange(state, (path, current) => {
  if (path === 'status') {
    if (current === 'success') {
      elements.input.classList.remove('is-invalid');
      elements.feedback.classList.replace('text-danger', 'text-success');
      elements.feedback.textContent = feedbackTexts[current];
      elements.form.reset();
      elements.input.focus();
    } else if (current === 'fail') {
      elements.input.classList.add('is-invalid');
      elements.feedback.classList.remove('text-success');
      elements.feedback.classList.add('text-danger');
    }
  }

  if (path === 'error' && current !== null) {
    elements.feedback.textContent = feedbackTexts[current];
  }
});
