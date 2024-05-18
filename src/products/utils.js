const excelGenerate = (products, name, res) => {
    const xl = require('excel4node');

    // Mapear productos a la estructura adecuada para Excel
    products = products.map((product) => {
        console.log(product)
        return {
            ID: Number(product.ID), // Convertir ID a número
            NOMBRE: product.NOMBRE,
            PRECIO: parseFloat(product.PRECIO) // Convertir PRECIO a número de coma flotante
        };
    });

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet('Inventario');

    // Escribir los encabezados de las columnas
    const headers = Object.keys(products[0]);
    headers.forEach((header, index) => {
        ws.cell(1, index + 1).string(header);
    });

    // Escribir los datos de los productos en el archivo Excel
    products.forEach((product, rowIndex) => {
        Object.values(product).forEach((value, colIndex) => {
            if (typeof value === 'string') {
                ws.cell(rowIndex + 2, colIndex + 1).string(value);
            } else {
                ws.cell(rowIndex + 2, colIndex + 1).number(value);
            }
        });
    });

    // Escribir el archivo Excel y enviarlo en la respuesta
    wb.write(`${name}.xlsx`, res);
};

module.exports.ProductsUtils = {
    excelGenerate
};
