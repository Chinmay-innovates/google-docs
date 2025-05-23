import { Extension } from "@tiptap/react";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		lineHeight: {
			setLineHeight: (size: string) => ReturnType;
			unsetLineHeight: () => ReturnType;
		};
	}
}

export const LineHeightExtension = Extension.create({
	name: "lineHeight",
	addOptions() {
		return {
			types: ["heading", "paragraph"],
			defaultLineHeight: "normal",
		};
	},
	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					lineHeight: {
						default: this.options.defaultLineHeight,
						renderHTML: (attr: any) => {
							if (!attr.lineHeight) {
								return {};
							}
							return {
								style: `line-height: ${attr.lineHeight}`,
							};
						},
						parseHTML: (element) =>
							element.style.lineHeight || this.options.defaultLineHeight,
					},
				},
			},
		];
	},
	addCommands() {
		return {
			setLineHeight:
				(lineHeight: string) =>
				({ tr, state, dispatch }) => {
					const { selection } = state;
					tr = tr.setSelection(selection);

					const { from, to } = selection;

					state.doc.nodesBetween(from, to, (node, pos) => {
						if (this.options.types.includes(node.type.name)) {
							tr = tr.setNodeMarkup(pos, undefined, {
								...node.attrs,
								lineHeight,
							});
						}
					});

					if (dispatch) {
						dispatch(tr);
					}

					return true;
				},
			unsetLineHeight:
				() =>
				({ tr, state, dispatch }) => {
					const { selection } = state;
					tr = tr.setSelection(selection);

					const { from, to } = selection;

					state.doc.nodesBetween(from, to, (node, pos) => {
						if (this.options.types.includes(node.type.name)) {
							tr = tr.setNodeMarkup(pos, undefined, {
								...node.attrs,
								lineHeight: this.options.defaultLineHeight,
							});
						}
					});

					if (dispatch) {
						dispatch(tr);
					}

					return true;
				},
		};
	},
});
