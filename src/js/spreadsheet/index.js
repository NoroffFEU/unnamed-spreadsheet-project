// index.js

import createEle from '../helpers/createEle';
import cellRow from './cellRow';
import numberToLetter from '../helpers/numberToLetter';
import ifValidNumber from '../helpers/ifValidNumber';
import { highlightColumn } from './cellHighlight';

const number = numberToLetter(0);
console.log(number);

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
  const columnNumbers = createEle('tr', 'flex w-fit');
  const emptyTh = createEle('th', 'w-28');

  container.appendChild(tableHead);
  tableHead.appendChild(columnNumbers);
  columnNumbers.appendChild(emptyTh);

  for (let i = 0; i < cols; i++) {
    const colNumber = createEle(
      'th',
      'w-28 text-center border-x dark:border-ys-overlay-5 border-ys-amethyst-400 dark:bg-ys-overlay-15 bg-white py-2 snap-start',
      numberToLetter(i),
    );
    colNumber.setAttribute('data-col', i);

    // Add column highlight event listener
    colNumber.addEventListener('click', () => {
      highlightColumn(i); // Call the function to highlight the column
    });

    columnNumbers.appendChild(colNumber);
    console.log('clicked', colNumber);
  }

  const tableBody = createEle('tbody');

  for (let i = 0; i < rows; i++) {
    tableBody.appendChild(cellRow(cols, i));
  }

  container.appendChild(tableBody);

  // Remove the delete button if it's already handled in main.js
  // const deleteBtn = document.createElement('button');
  // deleteBtn.innerHTML = 'Delete Sheet Data';
  // deleteBtn.classList.add('delete-button');
  // deleteBtn.addEventListener('click', handleDeleteSheetData);

  // container.appendChild(deleteBtn);

  return container;
}
