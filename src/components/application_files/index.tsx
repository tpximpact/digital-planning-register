import Image from "next/image"
import file from "../../../public/images/file.jpg"
import {  Data } from "../../../util/type"


const ApplicationFile = ({documents}: Data) => {

    return(
        <>
        {
    documents && documents?.length > 0 && (

                    <><h2 className="govuk-heading-l">Files</h2><p className="govuk-body">To find out more detailed information, please read the following document(s) provided by the applicant.</p><div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
                        {documents.map((document: any, index: any) => (
                            <div key={index} style={{ display: 'flex', gap: '0 15px' }}>
                                <Image src={file} alt="File" width={130} height={160} />
                                <div className="" style={{ maxWidth: '20rem' }}>
                                    <p className="govuk-body"><a href={document?.url} className="govuk-link govuk-link--no-visited-state">{document.applicant_description}</a></p>
                                    <p className="govuk-hint">PDF, 8.94 MB, 62 pages</p>
                                    <p className="govuk-hint">This file may not be suitable for users of assistive technology.</p>
                                </div>
                            </div>
                        ))}
                    </div></>
)}
        </>
    )
}

export default ApplicationFile