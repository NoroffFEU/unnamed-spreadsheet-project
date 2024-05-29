/**
 * Callback for adding two numbers.
 *
 * @callback SaveCellCallback
 * @param {number} col - The column index.
 * @param {number} row - The row index.
 * @param {string} value - The cell value content.
 */

/**
 * @description Add events to handle cell navigation.
 * @param {string} tableSelector
 * @param {SaveCellCallback} saveCellCallback Callback function to handle the save cell content on `blur`event. It sends col, row and value params.
 */
export function addCellTargetingEvents(tableSelector, saveCellCallback) {
  const table = document.querySelector(tableSelector);

  table.addEventListener(
    'click',
    (ev) => {
      const td = ev.target;

      const col = td.dataset.col;
      const row = td.dataset.row;

      if (!col || !row) {
        return;
      }

      let input = document.createElement('input');
      input.type = 'text';

      input.dataset.col = col;
      input.dataset.row = row;

      //Add the FocusEvent
      input.addEventListener('blur', (ev) => {
        const cell = ev.currentTarget;

        const col = cell.dataset.col;
        const row = cell.dataset.row;

        const value = ev.currentTarget.value;

        saveCellCallback(col, row, value);

        ev.currentTarget?.remove();
      });

      input.addEventListener('keydown', (ev) => {
        const input = ev.target;
        const col = +input.dataset.col;
        const row = +input.dataset.row;

        let handled = false;

        //Add the KeyboardEvent
        console.log(ev);
        if (ev.key === 'ArrowRight') {
          handled = true;
          selectNextCell(col + 1, row);
        } else if (ev.key === 'ArrowLeft') {
          selectNextCell(col - 1, row);
          handled = true;
        } else if (ev.key === 'ArrowDown') {
          selectNextCell(col, row + 1);
          handled = true;
        } else if (ev.key === 'ArrowUp') {
          selectNextCell(col, row - 1);
          handled = true;
        } else if (ev.key === 'Tab' && ev.shiftKey === true) {
          // left
          handled = true;
          selectNextCell(col - 1, row);
        } else if (ev.key === 'Tab' && ev.shiftKey === false) {
          handled = true;
          // right
          selectNextCell(col + 1, row);
        } else if (ev.key === 'Enter') {
          handled = true;
          selectNextCell(col, row + 1);
        }

        if (handled) {
          ev.preventDefault();
        }
      });

      td.appendChild(input);
      input.focus();
    },
    false,
  );
}

/**
 * @description Find the cell and click on it to give the focus.
 * @method selectNextCell
 * @param {number} col  The col index.
 * @param {number} row  The row index.
 * */
function selectNextCell(col, row) {
  // handle the min col and row
  if (row < 0) {
    row = 0;
  }

  if (col < 0) {
    col = 0;
  }

  //handle max col and row
  // TODO: as it's not yet defined how max col & max row should work, I cannot handle the upper limits.

  const td = document.querySelector(`td[data-col="${col}"][data-row="${row}"]`);
  if (td) {
    td.click();
  }
}