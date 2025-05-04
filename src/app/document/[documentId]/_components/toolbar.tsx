"use client";

import { useState } from "react";
import { type Level } from "@tiptap/extension-heading";
import { type ColorResult, SketchPicker } from "react-color";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {
	AlignCenterIcon,
	AlignJustifyIcon,
	AlignLeftIcon,
	AlignRightIcon,
	BoldIcon,
	ChevronDown,
	CodeIcon,
	HighlighterIcon,
	ImageIcon,
	ItalicIcon,
	Link2Icon,
	ListCollapseIcon,
	ListIcon,
	ListOrderedIcon,
	ListTodoIcon,
	LucideIcon,
	MessageSquarePlusIcon,
	MinusIcon,
	PlusIcon,
	PrinterIcon,
	Redo2Icon,
	RemoveFormattingIcon,
	SearchIcon,
	SpellCheckIcon,
	UnderlineIcon,
	Undo2Icon,
	UploadIcon,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

const LineHeightButton = () => {
	const { editor } = useEditorStore();
	if (!editor) return null;

	const lineHeights = [
		{
			label: "Default",
			value: "normal",
		},
		{
			label: "Single",
			value: "1",
		},
		{
			label: "1.15",
			value: "1.15",
		},
		{
			label: "1.5",
			value: "1.5",
		},
		{
			label: "Double",
			value: "2",
		},
	];
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 overflow-hidden text-sm">
					<ListCollapseIcon className="size-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{lineHeights.map(({ label, value }) => (
					<button
						key={value}
						onClick={() => editor.chain().focus().setLineHeight(value).run()}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							editor.getAttributes("paragraph").lineHeight === value &&
								"bg-neutral-200/80"
						)}
					>
						<span className="text-sm">{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const FontSizeButton = () => {
	const { editor } = useEditorStore();
	if (!editor) return null;

	const currentFontSize = editor.getAttributes("textStyle").fontSize
		? editor.getAttributes("textStyle").fontSize.replace("px", "")
		: "16";

	const [fontSize, setFontSize] = useState(currentFontSize);
	const [inputValue, setInputValue] = useState(fontSize);
	const [isEditing, setIsEditing] = useState(false);

	const updateFontSize = (newSize: string) => {
		const size = parseInt(newSize);
		if (!isNaN(size) && size > 0) {
			editor.chain().focus().setFontSize(`${size}px`).run();
			setFontSize(newSize);
			setInputValue(newSize);
			setIsEditing(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleInputBlur = () => {
		updateFontSize(inputValue);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			updateFontSize(inputValue);
			editor.commands.focus();
		}
	};

	const increment = () => {
		const size = parseInt(fontSize);
		const newSize = size + 1;
		updateFontSize(newSize.toString());
	};
	const decrement = () => {
		const size = parseInt(fontSize);
		const newSize = size - 1;
		if (newSize > 1) {
			updateFontSize(newSize.toString());
		}
	};

	return (
		<div className="flex items-center gap-0.5">
			<button
				onClick={decrement}
				className="size-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
			>
				<MinusIcon className="size-4" />
			</button>
			{isEditing ? (
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
					onKeyDown={handleKeyDown}
					className="h-7 w-10 text-sm border border-neutral-400 text-center rounded-sm hover:bg-neutral-200/80"
				/>
			) : (
				<button
					onClick={() => {
						setIsEditing(true);
						setFontSize(currentFontSize);
					}}
					className="h-7 w-10 text-sm border border-neutral-400 text-center rounded-sm bg-transparent cursor-text"
				>
					{currentFontSize}
				</button>
			)}
			<button
				onClick={increment}
				className="size-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
			>
				<PlusIcon className="size-4" />
			</button>
		</div>
	);
};
const ListButton = () => {
	const { editor } = useEditorStore();
	if (!editor) return null;

	const lists = [
		{
			label: "Bullet List",
			icon: ListIcon,
			isActive: () => editor.isActive("bulletList"),
			onClick: () => editor.chain().focus().toggleBulletList().run(),
		},
		{
			label: "Ordered List",
			icon: ListOrderedIcon,
			isActive: () => editor.isActive("orderedList"),
			onClick: () => editor.chain().focus().toggleOrderedList().run(),
		},
	];
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 overflow-hidden text-sm">
					<ListIcon className="size-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{lists.map(({ label, icon: Icon, isActive, onClick }) => (
					<button
						key={label}
						onClick={onClick}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							isActive() && "bg-neutral-200/80"
						)}
					>
						<Icon className="size-4" />
						<span className="text-sm">{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
const AlignButton = () => {
	const { editor } = useEditorStore();
	if (!editor) return null;

	const alignments = [
		{
			label: "Align Left",
			value: "left",
			icon: AlignLeftIcon,
		},
		{
			label: "Align Center",
			value: "center",
			icon: AlignCenterIcon,
		},
		{
			label: "Align Right",
			value: "right",
			icon: AlignRightIcon,
		},
		{
			label: "Align Justify",
			value: "justify",
			icon: AlignJustifyIcon,
		},
	];
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 overflow-hidden text-sm">
					<AlignLeftIcon className="size-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{alignments.map(({ label, value, icon: Icon }) => (
					<button
						key={value}
						onClick={() => editor.chain().focus().setTextAlign(value).run()}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							editor.isActive("textStyle", { textAlign: value }) &&
								"bg-neutral-200/80"
						)}
					>
						<Icon className="size-4" />
						<span className="text-sm">{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const ImageButton = () => {
	const { editor } = useEditorStore();
	if (!editor) {
		return null;
	}

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState("");

	const onChange = (src: string) => {
		editor.chain().focus().setImage({ src }).run();
	};

	const onUpload = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.onchange = (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				const imageURL = URL.createObjectURL(file);
				onChange(imageURL);
			}
		};
		input.click();
	};

	const handleImageUrlSubmit = () => {
		if (imageUrl) {
			onChange(imageUrl);
			setImageUrl("");
			setIsDialogOpen(false);
		}
	};
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 overflow-hidden text-sm">
						<ImageIcon className="size-4" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={onUpload}>
						<UploadIcon className="size-4 mr-2" />
						Upload
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
						<SearchIcon className="size-4 mr-2" />
						Paste image URL
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Insert image URL</DialogTitle>
					</DialogHeader>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleImageUrlSubmit();
						}}
					>
						<Input
							placeholder="Insert image URL"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
						/>
						<DialogFooter>
							<Button type="submit">Insert</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};
const LinkButton = () => {
	const { editor } = useEditorStore();
	if (!editor) return null;
	const [value, setValue] = useState("");

	const onChange = (href: string) => {
		editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
		setValue("");
	};

	return (
		<DropdownMenu
			onOpenChange={(open) => {
				if (open) {
					setValue(editor.getAttributes("link").href || "");
				}
			}}
		>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 overflow-hidden text-sm">
					<Link2Icon className="size-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
				<Input
					onChange={(e) => setValue(e.target.value)}
					value={value}
					placeholder="https://example.com"
				/>
				<Button onClick={() => onChange(value)}>Apply</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const TextColorButton = () => {
	const { editor } = useEditorStore();
	if (!editor) return null;

	const value = editor.getAttributes("textStyle").color || "#000000";

	const onChange = (color: ColorResult) => {
		editor.chain().focus().setColor(color.hex).run();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm  overflow-hidden hover:bg-neutral-200/80"
					style={{
						backgroundColor: value,
					}}
				>
					<span className="text-white">A</span>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-0">
				<SketchPicker color={value} onChange={onChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const HighlightColorButton = () => {
	const { editor } = useEditorStore();
	if (!editor) return null;

	const value = editor.getAttributes("highlight").color || "#FFFFFF";
	const onChange = (color: ColorResult) => {
		editor.chain().focus().setHighlight({ color: color.hex }).run();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 overflow-hidden text-sm">
					<HighlighterIcon className="size-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-0">
				<SketchPicker color={value} onChange={onChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
const CodeButton = () => {
	const { editor } = useEditorStore();
	if (!editor) return null;

	const isActive = editor.isActive("code");

	const toggleCode = () => {
		editor.chain().focus().toggleCode().run();
	};

	return (
		<button
			onClick={toggleCode}
			className={`h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 overflow-hidden text-sm ${
				isActive ? "bg-neutral-300" : ""
			}`}
			title="Inline Code"
		>
			<CodeIcon className="size-4" />
		</button>
	);
};

const HeadingLevelButton = () => {
	const { editor } = useEditorStore();
	if (!editor) return null;

	const headings = [
		{ label: "Normal text", value: 0, fontSize: "16px" },
		{ label: "Heading 1", value: 1, fontSize: "32px" },
		{ label: "Heading 2", value: 2, fontSize: "24px" },
		{ label: "Heading 3", value: 3, fontSize: "18px" },
		{ label: "Heading 4", value: 4, fontSize: "16px" },
		{ label: "Heading 5", value: 5, fontSize: "12px" },
	];

	const getCurrentHeading = () => {
		for (let level = 1; level <= 5; level++) {
			if (editor.isActive("heading", { level })) {
				return `Heading ${level}`;
			}
		}
		return "Normal text";
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 overflow-hidden text-sm">
					<span className="truncate">{getCurrentHeading()}</span>
					<ChevronDown className="ml-2 size-4 shrink-0" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{headings.map(({ fontSize, label, value }) => (
					<button
						key={value}
						style={{ fontSize }}
						onClick={() => {
							if (value === 0) {
								editor.chain().focus().setParagraph().run();
							} else {
								editor
									.chain()
									.focus()
									.toggleHeading({ level: value as Level })
									.run();
							}
						}}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							(value === 0 && !editor.isActive("heading")) ||
								(editor.isActive("heading", { level: value }) &&
									"bg-neutral-200/80")
						)}
					>
						{label}
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const FontFamilyButton = () => {
	const { editor } = useEditorStore();
	if (!editor) return null;

	const fonts = [
		{ label: "Arial", value: "Arial" },
		{ label: "Times New Roman", value: "Times New Roman" },
		{ label: "Courier New", value: "Courier New" },
		{ label: "Georgia", value: "Georgia" },
		{ label: "Verdana", value: "Verdana" },
		{ label: "Tahoma", value: "Tahoma" },
		{ label: "Trebuchet MS", value: "Trebuchet MS" },
		{ label: "Impact", value: "Impact" },
		{ label: "Comic Sans MS", value: "Comic Sans MS" },
		{ label: "Lucida Console", value: "Lucida Console" },
		{ label: "Monaco", value: "Monaco" },
		{ label: "Garamond", value: "Garamond" },
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 overflow-hidden text-sm">
					<span className="truncate">
						{editor.getAttributes("textStyle").fontFamily || "Arial"}
					</span>
					<ChevronDown className="ml-2 size-4 shrink-0" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{fonts.map(({ label, value }) => (
					<button
						onClick={() => editor.chain().focus().setFontFamily(value).run()}
						key={value}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							editor.getAttributes("textStyle").fontFamily === value &&
								"bg-neutral-200/80"
						)}
						style={{ fontFamily: value }}
					>
						<span className="text-sm">{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

interface ToolbarButtonProps {
	onClick?: () => void;
	isActive?: boolean;
	icon: LucideIcon;
}

const ToolbarButton = ({
	icon: Icon,
	isActive,
	onClick,
}: ToolbarButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				"text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
				isActive && "bg-neutral-200/80"
			)}
		>
			<Icon className="size-4" />
		</button>
	);
};

const __TabSeparator__ = () => (
	<Separator orientation="vertical" className="h-6 bg-neutral-300" />
);

export const Toolbar = () => {
	const { editor } = useEditorStore();
	if (!editor) return null;

	const sections: {
		label: string;
		icon: LucideIcon;
		onClick: () => void;
		isActive?: boolean;
	}[][] = [
		[
			{
				label: "Undo",
				icon: Undo2Icon,
				onClick: () => editor.chain().focus().undo().run(),
			},
			{
				label: "Redo",
				icon: Redo2Icon,
				onClick: () => editor.chain().focus().redo().run(),
			},
			{
				label: "Print",
				icon: PrinterIcon,
				onClick: () => window.print(),
			},
			{
				label: "Spell Check",
				icon: SpellCheckIcon,
				onClick: () => {
					const current = editor.view.dom.getAttribute("spellcheck");
					editor.view.dom.setAttribute(
						"spellcheck",
						current === "false" ? "true" : "false"
					);
				},
			},
		],
		[
			{
				label: "Bold",
				icon: BoldIcon,
				onClick: () => editor.chain().focus().toggleBold().run(),
				isActive: editor.isActive("bold"),
			},
			{
				label: "Italic",
				icon: ItalicIcon,
				onClick: () => editor.chain().focus().toggleItalic().run(),
				isActive: editor.isActive("italic"),
			},
			{
				label: "Underline",
				icon: UnderlineIcon,
				onClick: () => editor.chain().focus().toggleUnderline().run(),
				isActive: editor.isActive("underline"),
			},
		],
		[
			{
				label: "Comment",
				icon: MessageSquarePlusIcon,
				onClick: () => console.log("Comment"),
				isActive: false,
			},
			{
				label: "List Todo",
				icon: ListTodoIcon,
				onClick: () => editor.chain().focus().toggleTaskList().run(),
				isActive: editor.isActive("taskList"),
			},
			{
				label: "Remove Formatting",
				icon: RemoveFormattingIcon,
				onClick: () => editor.chain().focus().unsetAllMarks().run(),
			},
		],
	];

	return (
		<div className="bg-paper-300 px-2.5 py-0.5 rounded-[24px] min-h-[48px] flex items-center gap-x-0.5 overflow-x-auto">
			{sections[0].map((section) => (
				<ToolbarButton key={section.label} {...section} />
			))}
			<__TabSeparator__ />
			<FontFamilyButton />
			<__TabSeparator__ />
			<HeadingLevelButton />
			<__TabSeparator__ />
			<FontSizeButton />
			<__TabSeparator__ />
			{sections[1].map((section) => (
				<ToolbarButton key={section.label} {...section} />
			))}
			<TextColorButton />
			<HighlightColorButton />
			<__TabSeparator__ />
			<LinkButton />
			<CodeButton />
			<__TabSeparator__ />
			<ImageButton />
			<AlignButton />
			<LineHeightButton />
			<ListButton />
			{sections[2].map((section) => (
				<ToolbarButton key={section.label} {...section} />
			))}
		</div>
	);
};
