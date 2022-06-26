import { useParams } from "react-router-dom";
import { Header, PlayerVideo, Sidebar } from "../components";

export const Event = () => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {slug ? (
          <PlayerVideo lessonSlug={slug} />
        ) : (
          <div className="flex-1"></div>
        )}
        <Sidebar />
      </main>
    </div>
  );
};
