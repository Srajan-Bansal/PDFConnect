// const pdfMake = require('pdfmake/build/pdfmake');
// const pdfFonts = require('pdfmake/build/vfs_fonts');
// const puppeteer = require('puppeteer');
// const fs = require('fs');

// // Load the pdfmake fonts
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// async function convertHtmlFileToPdfAndDownload(htmlFilePath, fileName) {
// 	const browser = await puppeteer.launch();
// 	const page = await browser.newPage();

// 	// Read HTML file content
// 	const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

// 	// Set content to the HTML
// 	await page.setContent(htmlContent);

// 	// Wait for a specified duration (e.g., 2 seconds)
// 	// await page.waitFor(2000); // Adjust as needed

// 	// Generate PDF
// 	const pdfBuffer = await page.pdf({ format: 'A4' });

// 	// Close the browser
// 	await browser.close();

// 	// Save the PDF to disk
// 	const outputPath = fileName || 'document.pdf';
// 	fs.writeFileSync(outputPath, pdfBuffer);

// 	console.log(`PDF saved to ${outputPath}`);
// }

// // Example usage
// const htmlFilePath = './dis.html';
// const fileName = 'output.pdf'; // Provide the desired output file name here

// convertHtmlFileToPdfAndDownload(htmlFilePath, fileName)
// 	.then(() => console.log('PDF downloaded successfully'))
// 	.catch((error) => console.error('Error:', error));
