import { useRouter } from "next/router";
import { useLiveQuery } from "@sanity/preview-kit";
import { projectQuery } from "../../../pages/project/[slug]";
import Project from "./Project";

export default function PreviewProject({ project }) {
	const params = useRouter().query;
	const [data] = useLiveQuery(project, projectQuery, params);
	return <Project project={data} />;
}
