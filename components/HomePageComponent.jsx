export const query = `{
  "page": *[_type == "page" && _id == *[_type == "settings"][0].homePage->_id][0],
  "settings": *[_type == "settings"][0]
}`;

import Blocks from "@/components/Blocks";

export default function HomePageComponent({ data }) {
  const { page } = data || {};

  return (
    <main className="pb-28">
      <div>
        <h1 className="text-center text-7xl font-black mx-auto flex flex-col mt-56 mb-40">
          <span>CURATING</span><span>CONTEMPORARY</span><span>CULTURE</span>
        </h1>
      </div>
      {page?.blocks ? <Blocks data={page?.blocks} /> : null}
    </main>
  );
}
