import Link from "next/link";
import Menu from "../menu";

const Header = ({ currentPath }: { currentPath: string }) => {
  return (
    <header className="govuk-header" role="banner" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo">
          <Link
            href="/"
            className="govuk-header__link govuk-header__link--homepage"
          >
            <svg
              focusable="false"
              role="img"
              className="govuk-header__logotype"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 350 75"
              width="148"
              aria-label="GOV.UK"
            >
              <path
                d="M48.3,2.607V15.1L59.3,20.4H68.34s1.66-2-1.356-3.6a22.25,22.25,0,0,0-5.294-.3c-1.762.3-1.87-1.5.108-1.5H80.074S79.118,3.052,69.17,2.706c-11.321-.4-20.872-.1-20.872-.1M90.183,34.657V22.164l-11.006-5.3H70.14s-1.66,2,1.35,3.594a22.122,22.122,0,0,0,5.294.309c1.774-.309,1.87,1.5-.1,1.5H58.406s.951,11.949,10.9,12.3c11.321.4,20.872.1,20.872.1M48.3,71.958v-12.5l11.006-5.3H68.34s1.66,2-1.356,3.606a22.094,22.094,0,0,1-5.294.291c-1.762-.291-1.87,1.51.108,1.51H80.074s-.956,11.936-10.9,12.29c-11.321.4-20.872.1-20.872.1M90.183,39.9V52.395L79.177,57.7H70.14s-1.66-2,1.35-3.6a22.237,22.237,0,0,1,5.294-.3c1.774.3,1.87-1.491-.1-1.491H58.406s.951-11.944,10.9-12.3c11.321-.4,20.872-.1,20.872-.1M44.888,2.607V15.1L33.876,20.4H24.843s-1.664-2,1.346-3.6a22.355,22.355,0,0,1,5.307-.3c1.758.3,1.863-1.5-.108-1.5H13.1S14.061,3.052,24.016,2.706c11.324-.4,20.872-.1,20.872-.1M3,34.657V22.164l11.006-5.3h9.036s1.669,2-1.347,3.594a22.147,22.147,0,0,1-5.3.309c-1.767-.309-1.87,1.5.1,1.5H34.777s-.956,11.949-10.9,12.3c-11.314.4-20.872.1-20.872.1m41.888,37.3v-12.5l-11.012-5.3H24.843s-1.664,2,1.346,3.606a22.2,22.2,0,0,0,5.307.291c1.758-.291,1.863,1.51-.108,1.51H13.1s.956,11.936,10.911,12.29c11.324.4,20.872.1,20.872.1M3,39.9V52.395l11.006,5.3h9.036s1.669-2-1.347-3.6a22.263,22.263,0,0,0-5.3-.3c-1.767.3-1.87-1.491.1-1.491H34.777s-.956-11.944-10.9-12.3C12.558,39.6,3,39.9,3,39.9m313.616,18.7h7.563V40.315a7.924,7.924,0,0,1,8.3-8.162c4.439,0,6.566,2.1,6.69,6.958V58.605h7.563V37.323c0-6.964-4.71-10.563-12.139-10.563a12.577,12.577,0,0,0-10.675,5.517l-.134-.123V27.6h-7.169ZM286.769,40.372c.209-4.62,3.788-8.219,9.027-8.219a8.505,8.505,0,0,1,8.62,8.219Zm25.21,4.5c1.267-9.3-5.374-18.115-16.183-18.115-10.219,0-16.59,7.557-16.59,16.377,0,9.531,6.039,16.317,16.786,16.317,7.49,0,13.872-3.787,15.52-10.558h-7.157c-1.327,3.414-3.984,5.152-8.363,5.152-6.295,0-9.223-4.318-9.223-9.173ZM274.663,15.781h-7.551v15.84h-.135c-2.324-3.421-7.1-4.862-11.412-4.862-7.5,0-14.856,4.917-14.856,16.13,0,9.3,5.239,16.564,16.048,16.564,4.317,0,8.621-1.5,10.613-5.041h.135v4.193h7.157ZM248.272,43.434c0-5.579,2.508-11.281,9.617-11.281,5.842,0,9.481,4.081,9.481,10.921,0,5.394-2.853,10.973-9.617,10.973-6.566,0-9.481-5.276-9.481-10.614Zm-61.42,15.172h7.563V40.2c0-5.165,3.578-8.046,7.49-8.046,4.575,0,6.037,2.288,6.037,6.536V58.605h7.563V40.44c0-5.226,2.189-8.286,7.293-8.286,5.9,0,6.247,3.419,6.247,8.342v18.11H236.6V37.2c0-7.564-4.244-10.439-11.475-10.439a12.784,12.784,0,0,0-10.747,5.152c-1.526-3.538-5.436-5.152-9.617-5.152-5.437,0-8.289,2.1-10.553,5.152h-.2V27.6h-7.157Zm-8.826-22.853c0-6.538-7.035-8.993-13.743-8.993-7.553,0-15.051,2.331-15.58,10.323h7.563c.332-3.359,3.317-4.929,7.563-4.929,3.05,0,7.1.66,7.1,4.2,0,4.02-4.845,3.482-10.284,4.385-6.363.662-13.195,1.918-13.195,9.655,0,6.061,5.565,9.062,11.735,9.062,4.045,0,8.892-1.145,11.879-3.787.591,2.821,2.786,3.787,5.829,3.787a21.006,21.006,0,0,0,4.787-.786V53.935a12.383,12.383,0,0,1-1.861.112c-1.389,0-1.788-.65-1.788-2.332Zm-7.568,12.419c0,4.318-5.165,5.876-8.486,5.876-2.659,0-6.967-.89-6.967-3.952,0-3.6,2.915-4.683,6.171-5.165,3.317-.538,6.963-.477,9.282-1.856ZM144.63,30.16c-.969-9-9.174-14.194-19.575-14.256-13.825,0-22.093,9.933-22.093,21.852s8.268,21.851,22.093,21.851c11.175,0,19-6.9,19.639-16.89h-7.882c-.643,6.086-4.584,10.935-11.757,10.935-9.883,0-14.015-7.893-14.015-15.9s4.132-15.9,14.015-15.9c6.717,0,10.143,3.507,11.5,8.3Z"
                fill="#fff"
              />
            </svg>
          </Link>
        </div>
        <div>
          <Link
            href="/"
            className="govuk-header__link govuk-header__service-name"
            role="link"
          >
            Digital Planning Register
          </Link>
        </div>
      </div>
      <div className="govuk-header__menu">
        <label
          htmlFor="menu-toggle"
          className="govuk-header__menu-button menu-button"
          aria-controls="navigation"
          aria-label="Toggle menu"
        >
          Menu
        </label>
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <div className="menu" id="navigation" aria-labelledby="menu-toggle">
          <Menu currentPath={currentPath} />
        </div>
      </div>
    </header>
  );
};

export default Header;
