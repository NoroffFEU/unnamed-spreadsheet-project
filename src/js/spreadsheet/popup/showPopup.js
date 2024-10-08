import { createPopup } from './createPopup';
import { handleKeydownInput } from './handleKeydownInput';
import { handleOutsideClicks } from './handleOutsideClicks';

export let lastActiveTd = null;

export function showPopup(event) {
  event.preventDefault();

  const targetTd = event.target;

  if (targetTd.tagName !== 'TD' && targetTd.tagName !== 'INPUT') {
    return;
  }

  if (lastActiveTd && lastActiveTd !== targetTd) {
    lastActiveTd.classList.remove(
      'dark:border-ys-pink-500',
      'border-ys-pink-500',
    );
    lastActiveTd.classList.add('dark:border-ys-overlay-5');
  }

  targetTd.classList.add('dark:border-ys-pink-500');
  targetTd.classList.remove('dark:border-ys-overlay-5');

  let popup = document.getElementById('cell-popup');
  if (popup) {
    popup.remove();
  }

  popup = createPopup(targetTd);

  popup.classList.remove('hidden');

  const relativeTarget =
    targetTd.tagName === 'TD' ? targetTd : targetTd.parentElement;
  relativeTarget.classList.add('relative');
  relativeTarget.append(popup);

  console.log('targetTd after relative add', targetTd);
  popup.classList.add('absolute', 'left-full', 'top-2/4');

  lastActiveTd = targetTd;

  handleOutsideClicks(popup, lastActiveTd);

  if (targetTd.tagName === 'INPUT') {
    console.log('keydown eventlistener');
    handleKeydownInput(popup, lastActiveTd);
  }
}