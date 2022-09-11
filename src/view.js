import onChange from 'on-change';

export default (state, elements, i18nextInstance) => onChange(state, (path, current) => {
  if (path === 'status') {
    if (current === 'success') {
      elements.input.classList.remove('is-invalid');
      elements.feedback.classList.replace('text-danger', 'text-success');
      elements.feedback.textContent = i18nextInstance.t('success');
      elements.form.reset();
      elements.input.focus();
    } else if (current === 'fail') {
      elements.input.classList.add('is-invalid');
      elements.feedback.classList.remove('text-success');
      elements.feedback.classList.add('text-danger');
    }
  }

  if (path === 'error' && current !== null) {
    elements.feedback.textContent = i18nextInstance.t(`errors.${current}`);
  }
});
