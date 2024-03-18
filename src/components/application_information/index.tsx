import { Data } from "../../../util/type";
import Image from "next/image";
import locationplan from "../../../public/images/locationplan.png"
import moment from "moment";


const ApplicationInformation = ({reference_in_full, application_type, site, received_date, result_flag, determination_date, status, consultation} : Data) => {

    return(
        <>
        <div className="govuk-grid-row grid-row-extra-bottom-margin">   
            <div className="govuk-grid-column-one-quarter">
                <Image src={locationplan} alt="Boundary map" width={250} height={200}/>
            </div>

        <div className="govuk-grid-column-three-quarters" >
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-quarter" >
                    <h2 className="govuk-heading-s">Reference Number</h2>
                    <p className="govuk-body">{reference_in_full}</p>
                </div>

            <div className="govuk-grid-column-one-quarter">
                <h2 className="govuk-heading-s">Application Type</h2>
                <p className="govuk-body">{application_type?.replace(/_/g, " ")}</p>
            </div>

             <div className="govuk-grid-column-one-quarter">
                <h2 className="govuk-heading-s">Address</h2>
                <p className="govuk-body">{ site?.address_1 }, { site?.postcode }</p>
            </div>

            <div className="govuk-grid-column-one-quarter">
                <h2 className="govuk-heading-s">Date Submitted</h2>
                <p className="govuk-body">{moment(received_date).format("MM-DD-YYYY")}</p>
            </div>
         </div>
        <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-quarter">
                <h2 className="govuk-heading-s">Decision</h2>
                {
                    result_flag && <p className="govuk-tag--yellow govuk-body" style={{maxWidth: "fit-content", padding: "2px 10px"}}>{ result_flag}</p>     
                }
            </div>
            <div className="govuk-grid-column-one-quarter">
                <h2 className="govuk-heading-s">Status</h2>
                 <p className="govuk-tag--blue govuk-body" style={{maxWidth: "fit-content", padding: "2px 10px"}}>{status?.replace(/_/g, " ")}</p>
            </div>

            <div className="govuk-grid-column-one-quarter">
                <h2 className="govuk-heading-s">Decision Date</h2>
                <p className="govuk-body">{moment(determination_date).format("MM-DD-YYYY")}</p>
            </div>
            <div className="govuk-grid-column-one-quarter">
                <h2 className="govuk-heading-s">Consultation open until</h2>
                <p className="govuk-body">{moment(consultation?.end_date).format("MM-DD-YYYY")}</p>
            </div>
            </div>
        </div>
        </div>

        <div className="govuk-grid-row  grid-row-extra-bottom-margin">
        <div className="govuk-grid-column-full" style={{maxWidth: "50rem", display: "flex", justifyContent: "space-between"}}>
            <a href="/" role="button" className="govuk-button govuk-button--secondary button-extra-right-margin" data-module="govuk-button">View on map</a>
            <a href="/" role="button" className="govuk-button govuk-button--secondary button-extra-right-margin" data-module="govuk-button">View the Digital Site Notice</a>
            <a href="/" role="button" className="govuk-button govuk-button--secondary" data-module="govuk-button">View the submitted application</a>
        </div> 
        </div>
        </>
    )
}

export default ApplicationInformation;