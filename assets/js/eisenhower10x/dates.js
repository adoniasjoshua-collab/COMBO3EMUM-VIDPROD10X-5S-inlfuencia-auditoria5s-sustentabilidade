import { isDay } from './tasks.js';

export function formatDateBR(iso) { return iso ? iso.split('-').reverse().join('/') : ''; }
export function parseDateBR(value) {
  const text = value.trim().replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3');
  if (!text) return '';
  const parts = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  const iso = parts ? `${parts[3]}-${parts[2]}-${parts[1]}` : '';
  if (!isDay(iso) || parts[3] === '0000') throw new Error('Informe um prazo válido no formato dd/mm/aaaa, como 13/09/2026.');
  return iso;
}

export function initDateInput(input, picker, button) {
  const sync = () => {
    input.removeAttribute('aria-invalid');
    try { picker.value = parseDateBR(input.value); } catch { picker.value = ''; }
  };
  input.addEventListener('input', sync);
  input.addEventListener('blur', () => { try { input.value = formatDateBR(parseDateBR(input.value)); } catch { /* Validar ao salvar, sem apagar o texto digitado. */ } });
  if (typeof picker.showPicker !== 'function') { button.hidden = true; return; }
  button.addEventListener('click', () => {
    sync();
    try { picker.showPicker(); } catch { input.focus(); }
  });
  picker.addEventListener('change', () => { input.value = formatDateBR(picker.value); input.removeAttribute('aria-invalid'); input.focus(); });
}
