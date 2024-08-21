import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { link } from '../Axios/link';
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

// pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

function Pages() {
    const [numPages, setNumPages] = useState(null);
    const [file, setFile] = useState(link.get('/getPdf/1'));
    console.log(file);
    
    

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document
                file={"/books/"}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
            </Document>
        </div>
    );
};


export default Pages