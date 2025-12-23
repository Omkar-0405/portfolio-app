import * as XLSX from "xlsx";

function parseDDMMYYYY(dateStr) {
  if (!dateStr) return null;

  const [dd, mm, yyyy] = dateStr.split("-").map(Number);

  // JS Date: new Date(year, monthIndex, day)
  return new Date(yyyy, mm - 1, dd);
}

export async function parseExcel(file) {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows = XLSX.utils.sheet_to_json(sheet, { range: 4 });

  return rows
    .map((r) => ({
      date: parseDDMMYYYY(r["NAV Date"]),
      nav: Number(r["NAV (Rs)"]),
    }))
    .sort((a, b) => a.date - b.date);
}
