import createEle from '../helpers/createEle';
import cellRow from './cellRow';
import ifValidNumber from '../helpers/ifValidNumber';
import { deleteSheetData } from './db';
// import { newColumn } from './newColumn';
import { renderColumns } from './renderColumns';

import {
  createContextMenuColumn,
  addContextMenuListener,
} from '../helpers/columnRowMenu';

// Create the context menus
const { contextMenu } = createContextMenuColumn();
addContextMenuListener(contextMenu);
/**
 * Creates a spreadsheet with the specified number of columns and rows.
 *
 * @param {number} cols - The number of columns in the spreadsheet.
 * @param {number} rows - The number of rows in the spreadsheet.
 * @returns {HTMLTableElement} The spreadsheet table element.
 */
export default function spreadsheet(cols, rows) {
  if (!ifValidNumber(cols, rows)) return;

  const container = createEle('table', 'spreadsheet-container');
  const tableHead = createEle('thead');
  const tableBody = createEle('tbody');
  const columnNumbers = createEle('tr', 'flex w-fit');
  const emptyTh = createEle('th', 'w-28');

  columnNumbers.appendChild(emptyTh);

  renderColumns(cols, columnNumbers, tableBody);

  // Create table body rows
  for (let i = 0; i < rows; i++) {
    tableBody.appendChild(cellRow(cols, i));
  }

  container.appendChild(tableHead);
  tableHead.appendChild(columnNumbers);
  container.appendChild(tableBody);

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'Delete Sheet Data';
  deleteBtn.classList.add('delete-button');
  deleteBtn.addEventListener('click', handleDeleteSheetData);

  container.appendChild(deleteBtn);

  return container;
}

/**
 * Handles the deletion of the cell data from the spreadsheet.
 * This function shows a confirmation dialog to the user,
 * and upon confirmation, it deletes the cell data from IndexedDB and clears the UI.
 *
 * @function handleDeleteSheetData
 */
function handleDeleteSheetData() {
  const confirmation = confirm(
    'Are you sure you want to delete all cell data?',
  );
  if (confirmation) {
    const cells = document.querySelectorAll('td');
    cells.forEach((cell) => {
      const cellId = cell.getAttribute('id');
      if (cellId) {
        deleteSheetData(cellId)
          .then(() => {
            cell.textContent = '';
          })
          .catch((error) => {
            console.error('Error deleting cell data:', error);
          });
      }
    });
    alert('All cell data deleted successfully.');
  }
}
