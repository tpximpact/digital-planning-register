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

import { DprContentPage } from "@/types";
import { slugify } from "@/util";

export const contentImpactMeasures = (): DprContentPage[] => {
  return [
    {
      key: slugify("Housing"),
      title: "Housing",
      content: (
        <>
          <p className="govuk-body">
            The number of self contained homes that are being proposed. This
            includes affordable, social and private housing. Larger schemes
            might have a range showing the minimum and maximum number of homes
            if the total number is going to be decided later.
          </p>
          <p className="govuk-body">
            Affordable housing is a term used to cover different types of
            housing that are less costly than housing on the private market.
            This might be social rented housing, affordable rented housing or
            housing which the government helps people to buy a proportion of. It
            can be shown as a proportion of the total number of homes, or as a
            proportion of the total residential floorspace.
          </p>
        </>
      ),
    },
    {
      key: slugify("Healthcare"),
      title: "Healthcare",
      content: (
        <>
          <p className="govuk-body">An explanation would go here</p>
        </>
      ),
    },
    {
      key: slugify("Open spaces"),
      title: "Open spaces",
      content: (
        <>
          <p className="govuk-body">
            Open space includes land and areas of water (such as rivers and
            canals) which can be used for sport, recreation and relaxation.
            Applicants calculate the amount of open space, but it&rsquo;s
            checked by council planners when assessing the application.
          </p>
        </>
      ),
    },
    {
      key: slugify("Jobs"),
      title: "Jobs",
      content: (
        <>
          <p className="govuk-body">
            The council estimates how many new jobs a new development will
            produce based on the size and type of development. This estimate is
            based on the Employment Density Guide (3rd addition) produced by
            Homes & Community Agency (2015). A summary of this guide is
            published as part of the Camden Planning Guidance for Employment
            sites and business premises (Appendix 1).
          </p>
        </>
      ),
    },
    {
      key: slugify("Carbon"),
      title: "Carbon",
      content: (
        <>
          <p className="govuk-body">
            Building regulations set the amount of carbon emissions a
            development can generate once it is in use. This shows how far below
            the legal requirements the proposal is.
          </p>
        </>
      ),
    },
    {
      key: slugify("Access"),
      title: "Access",
    },
  ];
};
