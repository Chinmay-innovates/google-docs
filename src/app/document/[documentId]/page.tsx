import dynamic from "next/dynamic";
import { Toolbar } from "./_components/toolbar";

const Editor = dynamic(() =>
	import("./_components/editor").then((mod) => mod.Editor)
);
interface Props {
	params: Promise<{
		documentId: string;
	}>;
}
const Page = async ({ params }: Props) => {
	const { documentId } = await params;
	return (
		<div className="min-h-screen bg-paper">
			<Toolbar />
			<Editor />
		</div>
	);
};

export default Page;
