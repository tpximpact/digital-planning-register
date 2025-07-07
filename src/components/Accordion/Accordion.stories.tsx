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

import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";
import { AccordionSection } from "./AccordionSection";

const meta = {
  title: "DPR Components/Accordion",
  component: Accordion,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    name: "applicationType",
    children: (
      <>
        <AccordionSection
          title="Fusce Inceptos Tristique Justo Pellentesque"
          name="accordion-section-1"
          summary="Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        >
          <p className="govuk-body">
            Cras mattis consectetur purus sit amet fermentum. Sed posuere
            consectetur est at lobortis. Nullam quis risus eget urna mollis
            ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur.
          </p>

          <p className="govuk-body">
            Cras mattis consectetur purus sit amet fermentum. Cras mattis
            consectetur purus sit amet fermentum. Aenean eu leo quam.
            Pellentesque ornare sem lacinia quam venenatis vestibulum.
            Vestibulum id ligula porta felis euismod semper. Donec id elit non
            mi porta gravida at eget metus. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper
            nulla non metus auctor fringilla.
          </p>

          <p className="govuk-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante venenatis dapibus posuere velit aliquet.
            Curabitur blandit tempus porttitor. Sed posuere consectetur est at
            lobortis.
          </p>
        </AccordionSection>

        <AccordionSection
          title="Sem Lorem Consectetur"
          name="accordion-section-2"
          summary="Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."
        >
          <p className="govuk-body">
            Curabitur blandit tempus porttitor. Fusce dapibus, tellus ac cursus
            commodo, tortor mauris condimentum nibh, ut fermentum massa justo
            sit amet risus. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Etiam porta sem
            malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus
            commodo, tortor mauris condimentum nibh, ut fermentum massa justo
            sit amet risus. Aenean lacinia bibendum nulla sed consectetur.
          </p>

          <p className="govuk-body">
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Donec ullamcorper nulla non metus auctor fringilla. Fusce dapibus,
            tellus ac cursus commodo, tortor mauris condimentum nibh, ut
            fermentum massa justo sit amet risus. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Donec sed odio dui. Donec ullamcorper nulla non metus auctor
            fringilla.
          </p>

          <p className="govuk-body">
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor. Duis mollis, est non commodo luctus, nisi erat porttitor
            ligula, eget lacinia odio sem nec elit. Aenean eu leo quam.
            Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam
            quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
            nibh, ut fermentum massa justo sit amet risus.
          </p>

          <p className="govuk-body">
            Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit
            amet non magna. Integer posuere erat a ante venenatis dapibus
            posuere velit aliquet. Donec sed odio dui.
          </p>
        </AccordionSection>
      </>
    ),
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SomeOpen: Story = {
  args: {
    children: (
      <>
        <AccordionSection
          title="Fusce Inceptos Tristique Justo Pellentesque"
          name="accordion-section-1"
          summary="Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        >
          <p className="govuk-body">
            Cras mattis consectetur purus sit amet fermentum. Sed posuere
            consectetur est at lobortis. Nullam quis risus eget urna mollis
            ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur.
          </p>

          <p className="govuk-body">
            Cras mattis consectetur purus sit amet fermentum. Cras mattis
            consectetur purus sit amet fermentum. Aenean eu leo quam.
            Pellentesque ornare sem lacinia quam venenatis vestibulum.
            Vestibulum id ligula porta felis euismod semper. Donec id elit non
            mi porta gravida at eget metus. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper
            nulla non metus auctor fringilla.
          </p>

          <p className="govuk-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante venenatis dapibus posuere velit aliquet.
            Curabitur blandit tempus porttitor. Sed posuere consectetur est at
            lobortis.
          </p>
        </AccordionSection>

        <AccordionSection
          title="Sem Lorem Consectetur"
          name="accordion-section-2"
          summary="Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."
          open={true}
        >
          <p className="govuk-body">
            Curabitur blandit tempus porttitor. Fusce dapibus, tellus ac cursus
            commodo, tortor mauris condimentum nibh, ut fermentum massa justo
            sit amet risus. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Etiam porta sem
            malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus
            commodo, tortor mauris condimentum nibh, ut fermentum massa justo
            sit amet risus. Aenean lacinia bibendum nulla sed consectetur.
          </p>

          <p className="govuk-body">
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Donec ullamcorper nulla non metus auctor fringilla. Fusce dapibus,
            tellus ac cursus commodo, tortor mauris condimentum nibh, ut
            fermentum massa justo sit amet risus. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Donec sed odio dui. Donec ullamcorper nulla non metus auctor
            fringilla.
          </p>

          <p className="govuk-body">
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor. Duis mollis, est non commodo luctus, nisi erat porttitor
            ligula, eget lacinia odio sem nec elit. Aenean eu leo quam.
            Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam
            quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
            nibh, ut fermentum massa justo sit amet risus.
          </p>

          <p className="govuk-body">
            Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit
            amet non magna. Integer posuere erat a ante venenatis dapibus
            posuere velit aliquet. Donec sed odio dui.
          </p>
        </AccordionSection>
      </>
    ),
  },
};
export const OneSection: Story = {
  args: {
    children: (
      <>
        <AccordionSection
          title="Fusce Inceptos Tristique Justo Pellentesque"
          name="accordion-section-1"
          summary="Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        >
          <p className="govuk-body">
            Cras mattis consectetur purus sit amet fermentum. Sed posuere
            consectetur est at lobortis. Nullam quis risus eget urna mollis
            ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur.
          </p>

          <p className="govuk-body">
            Cras mattis consectetur purus sit amet fermentum. Cras mattis
            consectetur purus sit amet fermentum. Aenean eu leo quam.
            Pellentesque ornare sem lacinia quam venenatis vestibulum.
            Vestibulum id ligula porta felis euismod semper. Donec id elit non
            mi porta gravida at eget metus. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper
            nulla non metus auctor fringilla.
          </p>

          <p className="govuk-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante venenatis dapibus posuere velit aliquet.
            Curabitur blandit tempus porttitor. Sed posuere consectetur est at
            lobortis.
          </p>
        </AccordionSection>
      </>
    ),
  },
};
export const NoSections: Story = {
  args: {
    children: <></>,
  },
};
