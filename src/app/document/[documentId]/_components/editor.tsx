"use client";

import StarterKit from "@tiptap/starter-kit";
import UnderLine from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor, EditorContent } from "@tiptap/react";

import { useEditorStore } from "@/store/use-editor-store";
import { FontSizeExtension } from "@/extensions/font-size";
import ImageResize from "@/extensions/resizeable-image";

export const Editor = () => {
	const { setEditor } = useEditorStore();
	const editor = useEditor({
		onCreate({ editor }) {
			setEditor(editor);
		},
		onDestroy() {
			setEditor(null);
		},
		onUpdate({ editor }) {
			setEditor(editor);
		},
		onSelectionUpdate({ editor }) {
			setEditor(editor);
		},
		onTransaction({ editor }) {
			setEditor(editor);
		},
		onFocus({ editor }) {
			setEditor(editor);
		},
		onBlur({ editor }) {
			setEditor(editor);
		},
		onContentError({ editor }) {
			setEditor(editor);
		},
		editorProps: {
			attributes: {
				style: "padding-left: 56px; padding-right: 56px;",
				class:
					"focus:outline-none print:border-0 bg-white border border-paper-200 flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
			},
		},
		extensions: [
			StarterKit,
			FontSizeExtension,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: "https",
			}),
			Highlight.configure({
				multicolor: true,
			}),
			Color,
			FontFamily.configure({
				types: ["textStyle"],
			}),
			TextStyle,
			UnderLine,
			TaskList,
			TaskItem.configure({
				nested: true,
			}),
			Table,
			TableRow,
			TableHeader,
			TableCell,
			ImageResize,
		],
		content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
		immediatelyRender: false,
	});

	return (
		<div className="size-full overflow-auto bg-paper-100 px-4 print:p-0 print:bg-white print:overflow-visible">
			<div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};
