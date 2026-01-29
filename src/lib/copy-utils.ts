export async function copyTableToClipboard(
  tableElement: HTMLTableElement,
): Promise<boolean> {
  if (!tableElement) return false;

  try {
    // Clone the table to avoid modifying the original DOM
    const clone = tableElement.cloneNode(true) as HTMLTableElement;

    // Ensure all cells have a border and padding for Excel
    const cells = clone.querySelectorAll("th, td");
    for (const cell of Array.from(cells) as HTMLElement[]) {
      cell.style.border = "1px solid #d1d5db";
      cell.style.padding = "4px 8px";
    }

    // Add basic table styling
    clone.style.borderCollapse = "collapse";
    clone.style.width = "100%";
    clone.style.fontSize = "12pt";
    clone.style.fontFamily = "Arial, sans-serif";

    const html = clone.outerHTML;
    const text = tableElement.innerText;

    const blobHtml = new Blob([html], { type: "text/html" });
    const blobText = new Blob([text], { type: "text/plain" });

    const data = [
      new ClipboardItem({
        "text/html": blobHtml,
        "text/plain": blobText,
      }),
    ];

    await navigator.clipboard.write(data);
    return true;
  } catch (err) {
    console.warn("Clipboard API failed, falling back to execCommand", err);

    // Fallback for older browsers or if ClipboardItem fails
    try {
      const range = document.createRange();
      range.selectNode(tableElement);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
        return true;
      }
    } catch (fallbackErr) {
      console.error("Fallback copy failed: ", fallbackErr);
    }
    return false;
  }
}

/**
 * Copy a div element containing grid data to clipboard as a formatted table
 */
export async function copyGridToClipboard(
  gridElement: HTMLElement,
  title: string,
): Promise<boolean> {
  if (!gridElement) return false;

  try {
    // Create a temporary table from the grid data
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    table.style.fontSize = "12pt";
    table.style.fontFamily = "Arial, sans-serif";

    // Add title row
    const titleRow = table.insertRow();
    const titleCell = titleRow.insertCell();
    titleCell.colSpan = 2;
    titleCell.textContent = title;
    titleCell.style.fontWeight = "bold";
    titleCell.style.fontSize = "14pt";
    titleCell.style.padding = "8px";
    titleCell.style.border = "1px solid #d1d5db";
    titleCell.style.backgroundColor = "#f3f4f6";

    // Find all label-value pairs in the grid
    const items = gridElement.querySelectorAll("[class*='flex']");
    items.forEach((item) => {
      const label = item.querySelector("[class*='font-semibold']");
      const value = item.querySelector("[class*='font-mono']");

      if (label && value) {
        const row = table.insertRow();
        const labelCell = row.insertCell();
        const valueCell = row.insertCell();

        labelCell.textContent = label.textContent || "";
        valueCell.textContent = value.textContent || "";

        labelCell.style.border = "1px solid #d1d5db";
        labelCell.style.padding = "4px 8px";
        labelCell.style.fontWeight = "bold";

        valueCell.style.border = "1px solid #d1d5db";
        valueCell.style.padding = "4px 8px";
        valueCell.style.textAlign = "right";
      }
    });

    // Also look for card-style items (like the special scores badges)
    const cardItems = gridElement.querySelectorAll("[class*='flex-col']");
    cardItems.forEach((item) => {
      const label = item.querySelector("[class*='uppercase']");
      const value = item.querySelector("[class*='font-mono']");

      if (label && value) {
        const row = table.insertRow();
        const labelCell = row.insertCell();
        const valueCell = row.insertCell();

        labelCell.textContent = label.textContent?.trim() || "";
        valueCell.textContent = value.textContent?.trim() || "";

        labelCell.style.border = "1px solid #d1d5db";
        labelCell.style.padding = "4px 8px";
        labelCell.style.fontWeight = "bold";

        valueCell.style.border = "1px solid #d1d5db";
        valueCell.style.padding = "4px 8px";
        valueCell.style.textAlign = "right";
      }
    });

    // Handle blends (single column of values)
    const blendItems = gridElement.querySelectorAll(
      "[class*='grid'] > [class*='rounded-md']",
    );
    if (blendItems.length > 0) {
      blendItems.forEach((item) => {
        const value = item.textContent?.trim();
        if (value && value !== "No blends found") {
          const row = table.insertRow();
          const cell = row.insertCell();
          cell.colSpan = 2;
          cell.textContent = value;
          cell.style.border = "1px solid #d1d5db";
          cell.style.padding = "4px 8px";
          cell.style.textAlign = "center";
        }
      });
    }

    // If no data was found, return false
    if (table.rows.length <= 1) {
      return false;
    }

    const html = table.outerHTML;
    const text = table.innerText;

    const blobHtml = new Blob([html], { type: "text/html" });
    const blobText = new Blob([text], { type: "text/plain" });

    const data = [
      new ClipboardItem({
        "text/html": blobHtml,
        "text/plain": blobText,
      }),
    ];

    await navigator.clipboard.write(data);
    return true;
  } catch (err) {
    console.error("Copy grid failed: ", err);
    return false;
  }
}

/**
 * Copy Core Section style data (multiple columns) to clipboard
 */
export async function copyCoreDataToClipboard(
  coreElement: HTMLElement,
  title: string,
): Promise<boolean> {
  if (!coreElement) return false;

  try {
    // Create a table with the core section data
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.fontSize = "12pt";
    table.style.fontFamily = "Arial, sans-serif";

    // Add title row
    const titleRow = table.insertRow();
    const titleCell = titleRow.insertCell();
    titleCell.colSpan = 10; // Max columns in core section
    titleCell.textContent = title;
    titleCell.style.fontWeight = "bold";
    titleCell.style.fontSize = "14pt";
    titleCell.style.padding = "8px";
    titleCell.style.border = "1px solid #d1d5db";
    titleCell.style.backgroundColor = "#f3f4f6";

    // Add header row
    const headerRow = table.insertRow();
    const dataRow = table.insertRow();

    // Find all data items
    const items = coreElement.querySelectorAll("[class*='text-base']");
    items.forEach((item) => {
      const label = item.textContent?.trim() || "";
      const valueElement =
        item.parentElement?.querySelector("[class*='text-xl']");
      const value = valueElement?.textContent?.trim() || "";

      const headerCell = headerRow.insertCell();
      headerCell.textContent = label;
      headerCell.style.border = "1px solid #d1d5db";
      headerCell.style.padding = "4px 8px";
      headerCell.style.fontWeight = "bold";
      headerCell.style.backgroundColor = "#f9fafb";

      const dataCell = dataRow.insertCell();
      dataCell.textContent = value;
      dataCell.style.border = "1px solid #d1d5db";
      dataCell.style.padding = "4px 8px";
      dataCell.style.textAlign = "center";
    });

    const html = table.outerHTML;
    const text = table.innerText;

    const blobHtml = new Blob([html], { type: "text/html" });
    const blobText = new Blob([text], { type: "text/plain" });

    const data = [
      new ClipboardItem({
        "text/html": blobHtml,
        "text/plain": blobText,
      }),
    ];

    await navigator.clipboard.write(data);
    return true;
  } catch (err) {
    console.error("Copy core data failed: ", err);
    return false;
  }
}
