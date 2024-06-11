/* eslint-disable react/no-unescaped-entities */
import { OpposedIcon, NeutralIcon, SupportIcon } from "../../../public/icons";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { useState } from "react";
const CommentSentimet = async (council: { council: string }) => {
  // const [opposedColor, setOpposedColor] = useState("transparent");
  // const [neutralColor, setNeutralColor] = useState("transparent");
  // const [supportColor, setSupportColor] = useState("transparent");
  return (
    <>
      <form
        className="form"
        action={async () => {
          "use server";
          cookies().set("feedbackNumber", "2");
          redirect(`/${council}/comment`);
        }}
      >
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h1 className="govuk-fieldset__heading">
            How do you feel about this development?
          </h1>
        </legend>

        <div className="wrap-icons-feeling" data-module="govuk-radios">
          <div
            className="govuk-radios__item"
            // onClick={() =>
            //   setOpposedColor(
            //     opposedColor == "transparent" ? "#AA2A16" : "transparent",
            //   )
            // }
          >
            <label className="govuk-label" htmlFor="whereDoYouLive">
              <OpposedIcon color={"opposedColor"} />
              <span className="govuk-body">Opposed</span>
            </label>
          </div>
          <div
            className="govuk-radios__item"
            // onClick={() =>
            //   setNeutralColor(
            //     neutralColor == "transparent" ? "#1D70B8" : "transparent",
            //   )
            // }
          >
            <label className="govuk-label" htmlFor="whereDoYouLive-2">
              <NeutralIcon color={"neutralColor"} />
              <span className="govuk-body">Neutral</span>
            </label>
          </div>
          <div
            className="govuk-radios__item"
            // onClick={() =>
            //   setSupportColor(
            //     supportColor == "transparent" ? "#00703C" : "transparent",
            //   )
            // }
          >
            <label className="govuk-label" htmlFor="whereDoYouLive-3">
              <SupportIcon color={"supportColor"} />
              <span className="govuk-body">Support</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="govuk-button"
          data-module="govuk-button"
          // onClick={() => cookies().set("feedbackNumber", "2")}
        >
          Continue
        </button>
      </form>
    </>
  );
};

export default CommentSentimet;
