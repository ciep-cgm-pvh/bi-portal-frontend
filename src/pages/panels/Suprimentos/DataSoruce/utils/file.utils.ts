import * as XLSX from 'xlsx';

const flattenData = (data: any[]) => {
  if (!data || data.length === 0) {
    return [];
  }
  return data.map((item) => {
    const flatItem: { [ key: string ]: any } = {};
    for (const [ key, value ] of Object.entries(item)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        for (const [ innerKey, innerValue ] of Object.entries(value)) {
          flatItem[ `${key}_${innerKey}` ] = innerValue;
        }
      } else {
        flatItem[ key ] = value;
      }
    }
    return flatItem;
  });
};

export const generateAndDownloadXLSX = (data: any[], filename: string) => {
  const flattenedData = flattenData(data);
  const worksheet = XLSX.utils.json_to_sheet(flattenedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const generateAndDownloadCSV = (data: any[], filename: string) => {
  const flattenedData = flattenData(data);
  const worksheet = XLSX.utils.json_to_sheet(flattenedData);
  const csvData = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([ csvData ], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generateAndDownloadJSON = (data: any[], filename: string) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([ jsonString ], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `${filename}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};