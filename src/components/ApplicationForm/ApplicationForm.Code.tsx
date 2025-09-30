"use client";
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

import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { EditorView } from "@codemirror/view";
import { json } from "@codemirror/lang-json";

interface EditorProps {
  submissionData: unknown;
}

/**
 * This ApplicationForm is designed to be used with an application
 * that is a valid application submission however currently we're typing it as
 * unknown since theres not enough validation from the current backend until we
 * check it ourselves
 * @param param0
 * @returns
 */
export const Editor = ({ submissionData }: EditorProps) => {
  const editor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor.current) return;

    const view = new EditorView({
      parent: editor.current,
      doc: JSON.stringify(submissionData, null, 2),
      extensions: [
        basicSetup,
        // make it read only
        EditorState.readOnly.of(true),
        EditorView.editable.of(false),
        EditorView.contentAttributes.of({ tabindex: "0" }),
        json(),
        EditorView.contentAttributes.of({
          "aria-label": "Application submission JSON data",
        }),
      ],
    });

    return () => {
      view.destroy();
    };
  }, [submissionData]);

  return <div ref={editor}></div>;
};
