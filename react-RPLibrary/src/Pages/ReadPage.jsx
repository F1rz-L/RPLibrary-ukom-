import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { link } from '../Axios/link';
import { useParams } from 'react-router-dom';
import LoadingAnimation from '../Components/LoadingAnimation';

// Set the worker URL for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function ReadPage() {
    const { bookId } = useParams();
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageInput, setPageInput] = useState(1); // State for page input

    console.log(bookId);
    useEffect(() => {

        link.get(`/getPdf/${bookId}`).then((res) => {
            const pdfUrl = res?.data?.data?.[0]?.namafile; // Adjust if necessary
            console.log('PDF URL:', pdfUrl); // Log the URL for debugging
            setFile(pdfUrl);
        })
            .catch((error) => {
                console.error('Error fetching the PDF URL:', error);
            });
    }, [bookId]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const handlePreviousPage = () => {
        setPageNumber(prevPageNumber => {
            const newPageNumber = Math.max(prevPageNumber - 1, 1);
            setPageInput(newPageNumber);
            return newPageNumber;
        });
    };

    const handleNextPage = () => {
        setPageNumber(prevPageNumber => {
            const newPageNumber = Math.min(prevPageNumber + 1, numPages);
            setPageInput(newPageNumber);
            return newPageNumber;
        });
    };

    const handlePageInputChange = (e) => {
        const inputValue = e.target.value;
        setPageInput(inputValue);
    };

    const handlePageInputSubmit = (e) => {
        e.preventDefault();
        const page = Math.max(1, Math.min(parseInt(pageInput, 10), numPages));
        if (!isNaN(page)) {
            setPageNumber(page);
        } else {
            alert('Invalid page number');
        }
    };

    return (
        <div className="max-w-4xl flex justify-center mx-auto p-4">
            {file ? (
                <div>
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={(error) => console.error('Error loading PDF:', error)}
                        className="w-1/2 bg-gray-100 border rounded-lg"
                        loading={<LoadingAnimation />}>
                        <Page
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            customTextRenderer={false}
                            pageNumber={pageNumber}
                            height={700}
                            className="mx-auto"
                        />
                    </Document>

                    <div className="join mt-4 flex sticky bottom-3 justify-center">
                        <button className="join-item btn opacity-80 hover:opacity-100" onClick={handlePreviousPage} disabled={pageNumber <= 1}>«</button>
                        <div className="dropdown dropdown-top join-item flex justify-center w-max ">
                            <div tabIndex={0} role="button" className="join-item btn opacity-80 backdrop-blur-lg hover:opacity-100">Page {pageNumber} of {numPages}</div>
                            <ul tabIndex={0} className="dropdown-content bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
                                <li>
                                    <label className="form-control flex">
                                        <div className="label">
                                            <span className="label-text text-xs">Go to page...</span>
                                        </div>
                                        <form onSubmit={handlePageInputSubmit} className="join-item">
                                            <input
                                                type="number"
                                                min="1"
                                                max={numPages}
                                                value={pageInput}
                                                onChange={handlePageInputChange}
                                                className="input input-bordered mx-1 w-max text-center"
                                            />
                                            <button type="submit" className="btn mx-1 btn-secondary">Go</button>
                                        </form>
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <button className="join-item btn opacity-80  hover:opacity-100" onClick={handleNextPage} disabled={pageNumber >= numPages}>»</button>
                    </div>
                </div>
            ) : (
                <p className="text-center opacity-50"><LoadingAnimation /></p>
            )}
        </div>
    );
}

export default ReadPage;
