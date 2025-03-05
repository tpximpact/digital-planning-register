/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

export function ThumbnailDocument() {
  return (
    <svg
      className="dpr-attachment__thumbnail-image dpr-attachment__thumbnail-image--document"
      version="1.1"
      viewBox="0 0 99 140"
      width="99"
      height="140"
      aria-hidden="true"
    >
      <path
        d="M12 12h75v27H12zM12 59h9v9h-9zM12 77h9v9h-9zM12 95h9v9h-9zM12 113h9v9h-9zM30 59h57v9H30zM30 77h39v9H30zM30 95h57v9H30zM30 113h48v9H30z"
        strokeWidth="0"
      />
    </svg>
  );
}

export function ThumbnailExternal() {
  return (
    <svg
      className="dpr-attachment__thumbnail-image dpr-attachment__thumbnail-image--external"
      version="1.1"
      viewBox="0 0 99 140"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 59H12V68H21V59ZM30 86V77H69V86H30ZM87 104H30V95H87V104ZM78 122H30V113H78V122ZM21 86H12V77H21V86ZM21 122H12V113H21V122ZM21 104H12V95H21V104ZM87 68H30V59H87V68ZM87 39V12H12V39H87ZM77.9699 29.2919H77.9202L75.2756 17H71.2279L68.5088 29.2919H68.4591L66.1249 17H62.2014L66.1746 34.8047H70.5699L73.2145 22.0409L75.9088 34.8047H80.3289L84.3021 17H80.391L77.9699 29.2919ZM53.8195 29.2919H53.8692L56.2903 17H60.2014L56.2282 34.8047H51.8081L49.1138 22.0409L46.4692 34.8047H42.0739L38.1007 17H42.0242L44.3584 29.2919H44.4081L47.1272 17H51.1749L53.8195 29.2919ZM29.7684 29.2919H29.7188L27.0742 17H23.0265L20.3074 29.2919H20.2577L17.9235 17H14L17.9732 34.8047H22.3685L25.0131 22.0409L27.7074 34.8047H32.1275L36.1007 17H32.1896L29.7684 29.2919Z"
      />
    </svg>
  );
}

export function ThumbnailGeneric() {
  return (
    <svg
      className="dpr-attachment__thumbnail-image dpr-attachment__thumbnail-image--generic"
      version="1.1"
      viewBox="0 0 84 120"
      width="84"
      height="120"
      aria-hidden="true"
    >
      <path
        d="M74.85 5v106H5"
        fill="none"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M79.85 10v106H10"
        fill="none"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  );
}

export function ThumbnailHtml() {
  return (
    <svg
      className="dpr-attachment__thumbnail-image dpr-attachment__thumbnail-image--html"
      version="1.1"
      viewBox="0 0 99 140"
      width="99"
      height="140"
      aria-hidden="true"
    >
      <path
        d="M30,95h57v9H30V95z M30,77v9h39v-9H30z M30,122h48v-9H30V122z M12,68h9v-9h-9V68z M12,104h9v-9h-9V104z M12,86h9v-9h-9V86z M12,122h9v-9h-9V122z M87,12v27H12V12H87z M33,17h-4v8h-6v-8h-4v18h4v-7l6,0v7l4,0V17z M49,17H35l0,3h5v15h4V20l5,0V17z M68,17h-4 l-5,6l-5-6h-4v18h4l0-12l5,6l5-6l0,12h4V17z M81,32h-6V17h-4v18h10V32z M30,68h57v-9H30v9z"
        strokeWidth="0"
      />
    </svg>
  );
}

export function ThumbnailPdf() {
  return (
    <svg
      className="dpr-attachment__thumbnail-image dpr-attachment__thumbnail-image--pdf"
      version="1.1"
      viewBox="0 0 99 140"
      aria-hidden="true"
    >
      <path d="M12,59h9v9h-9v-9ZM30,77v9h39v-9H30ZM30,104h57v-9H30v9ZM30,122h48v-9H30v9ZM12,86h9v-9h-9v9ZM12,122h9v-9h-9v9ZM12,104h9v-9h-9v9ZM30,68h57v-9H30v9ZM35.2,21c-.3-.2-.6-.4-1-.5s-.8-.2-1.3-.2h-2.6v5.5h2.6c.5,0,1,0,1.3-.2s.7-.3,1-.5c.3-.2.5-.5.7-.8s.2-.7.2-1.1h0c0-.5,0-.9-.2-1.2-.2-.3-.4-.6-.7-.8h0ZM52.4,21.9c-.4-.5-1-.9-1.6-1.1-.7-.3-1.5-.4-2.4-.4h-2.7v11.5h2.7c.9,0,1.7-.1,2.4-.4s1.2-.7,1.6-1.1c.4-.5.7-1.1.9-1.7.2-.7.3-1.4.3-2.1v-.7c0-.8,0-1.5-.3-2.1-.2-.6-.5-1.2-.9-1.7h0ZM87,12v27H12V12h75ZM39.8,23c0-.9-.1-1.6-.4-2.4-.3-.7-.7-1.4-1.2-1.9-.5-.5-1.2-1-1.9-1.2-.8-.3-1.6-.5-2.5-.5h-7.2v17.9h3.6v-6h3.2c.9,0,1.8-.1,2.6-.5.8-.3,1.4-.7,2-1.2.5-.5,1-1.2,1.3-1.9.3-.7.5-1.5.5-2.4h0ZM57.4,26c0-1.3-.2-2.6-.5-3.7s-.9-2-1.6-2.8c-.7-.8-1.6-1.4-2.7-1.8-1.1-.4-2.3-.6-3.8-.6h-6.6v17.9h6.6c1.5,0,2.7-.2,3.8-.6,1.1-.4,2-1,2.7-1.8.7-.8,1.3-1.7,1.6-2.8.4-1.1.5-2.3.5-3.7h0ZM72.4,17.1h-12.1v17.9h3.6v-7.5h7.8v-3.3h-7.8v-3.8h8.4s0-3.3,0-3.3Z" />
    </svg>
  );
}

export function ThumbnailSpreadsheet() {
  return (
    <svg
      className="dpr-attachment__thumbnail-image dpr-attachment__thumbnail-image--spreadsheet"
      version="1.1"
      viewBox="0 0 99 140"
      width="99"
      height="140"
      aria-hidden="true"
    >
      <path
        d="M12 12h75v27H12zm0 47h18.75v63H12zm55 2v59H51V61h16m2-2H49v63h20V59z"
        strokeWidth="0"
      />
      <path
        d="M49 61.05V120H32.8V61.05H49m2-2H30.75v63H51V59zm34 2V120H69.05V61.05H85m2-2H67v63h20V59z"
        strokeWidth="0"
      />
      <path
        d="M30 68.5h56.5M30 77.34h56.5M30 112.7h56.5M30 95.02h56.5M30 86.18h56.5M30 103.86h56.5"
        fill="none"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  );
}

export const thumbnails: Record<string, JSX.Element> = {
  document: <ThumbnailDocument />,
  external: <ThumbnailExternal />,
  generic: <ThumbnailGeneric />,
  html: <ThumbnailHtml />,
  pdf: <ThumbnailPdf />,
  spreadsheet: <ThumbnailSpreadsheet />,
};
