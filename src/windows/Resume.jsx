import React from 'react'
import windowWrapper from "#/hoc/WindowWrapper.jsx";
import {WindowControls} from "#/components/index.js";
import {Download} from "lucide-react";
import {Page, pdfjs} from 'react-pdf';
import {Document} from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const Resume = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="resume" />
                <h2>Resume.pdf</h2>

                <a href="/files/Saurabh_tiwari(1).pdf" download className="cursor-pointer" title="download resume">
                    <Download className="icon" />
                </a>
            </div>
            <Document file="/files/Saurabh_tiwari(1).pdf">
                <Page pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                />
            </Document>
        </>
    );
}

const ResumeWindow = windowWrapper(Resume, 'resume');
export default ResumeWindow;

