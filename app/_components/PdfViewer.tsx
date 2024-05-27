import React from 'react'

const PdfViewer = ({pdfurl}:{pdfurl:string}) => {
  return (
    <div className="w-full h-full col-span-2 shadow-lg rounded-lg border bg-white overflow-hidden p-1">
      <iframe src={`${pdfurl}`} className="w-full h-full rounded-lg"></iframe>
    </div>
  );
}

export default PdfViewer
