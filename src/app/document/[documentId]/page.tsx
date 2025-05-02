import { Editor } from "./_components/editor";

interface Props {
	params: Promise<{
		documentId: string;
	}>;
}
const Page = async ({ params }: Props) => {
	const { documentId } = await params;
	return (
		<div className="min-h-screen bg-paper">
			<Editor />
		</div>
	);
};

export default Page;
