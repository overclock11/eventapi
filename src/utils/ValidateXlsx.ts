import Exceljs from "exceljs";
import {ERROR_MESSAGES} from "../constant/ErrorMessages";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

export const validateXlsx = async (file: Express.Multer.File): Promise<string[][]> => {
    if(file.mimetype !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
        throw { error: `${ERROR_MESSAGES.badFormatFile}` }
    }
    try {
        const workbook = new Exceljs.Workbook();
        const readFile = await workbook.xlsx.readFile(file.path);
        const sheet = readFile.getWorksheet(1);
        const sheetToArray: string[][] = [];
        sheet?.eachRow((row, rowIndex)=>{
            sheetToArray[rowIndex-1] = [];
            row.eachCell((cell, cellIndex)=>{
                sheetToArray[rowIndex-1][cellIndex-1] = validateCells(cell?.value, cellIndex, rowIndex);
            });
            sheetToArray[rowIndex-1].unshift(uuidv4());
        });
        return sheetToArray;
    } catch (err) {
        console.log(err);
        throw { error: ERROR_MESSAGES.fileUpload }
    }
}

const validateCells = (cell: unknown, cellIndex: number, rowIndex: number): string => {
    switch (cellIndex) {
        case 1:
            if(typeof cell !== "string") {
                throw {
                    error: `${ERROR_MESSAGES.stringCellValue} valor: ${cell}, fila: ${rowIndex} columna: ${cellIndex}`
                }
            }
            return cell.toString();
        case 2:
            if(!moment(cell as Date).isValid()) {
                throw {
                    error: `${ERROR_MESSAGES.dateFormat} valor: ${cell}, fila: ${rowIndex} columna: ${cellIndex}`
                }
            }
            return (cell as Date).toISOString().split("T")[0];
        case 3:
            if(typeof cell !== "string") {
                throw {
                    error: `${ERROR_MESSAGES.stringCellValue} valor: ${cell}, fila: ${rowIndex} columna: ${cellIndex}`
                }
            }
            return cell;
        default:
            throw {error: `${ERROR_MESSAGES.badFormatFile}`}
    }
}