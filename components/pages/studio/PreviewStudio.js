import { useRouter } from "next/router";
import { useLiveQuery } from "@sanity/preview-kit";
import { postQuery } from "../../../pages/studio/[slug]";
import Studio from "./Studio";

export default function PreviewStudio({ studio }) {
	const params = useRouter().query;
	const [data] = useLiveQuery(studio, postQuery, params);
	return <Studio studio={data} />;
}
