"use client";
import "@mdxeditor/editor/style.css";
import { ForwardRefEditor } from "./MDX/ForwardRefEditor";
import { RefObject, forwardRef, useState } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
// import { headingsPlugin } from "@mdxeditor/editor";

// export const DiaryEntry = ({
//   givenDate,
//   ref,
// }: {
//   givenDate: Date | undefined;
//   ref: RefObject<MDXEditorMethods>;
// }) => {
//   const [markDownText, setMarkdownText] = useState(`## ${givenDate}`);
//   return (
//     <ForwardRefEditor
//       ref={ref}
//       className="bg-primary text-blue-100"
//       contentEditableClassName="prose prose-slate"
//       markdown={markDownText}
//       onChange={(e) => {
//         setMarkdownText(e);
//       }}
//     />
//   );
// };

export const DiaryEntry = forwardRef<MDXEditorMethods, { something: string }>(
  (props, ref) => {
    const [markDownText, setMarkdownText] = useState(`${props.something}`);
    return (
      <ForwardRefEditor
        ref={ref}
        className="underline text-blue-100"
        contentEditableClassName="prose prose-slate"
        markdown={markDownText}
        onChange={(e) => {
          setMarkdownText(e);
        }}
      />
    );
  }
);
