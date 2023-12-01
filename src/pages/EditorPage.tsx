import { observer } from "mobx-react-lite";
import { Sidebar } from "../components/Sidebar";

const EditorPage = observer(() => {
  return (
    <>
      <Sidebar />
      <main className="ml-20 mt-10">
        <div className="px-auto mx-auto flex max-w-fit flex-col items-center">
          <h1>抱歉，您提供的路徑不存在。</h1>
        </div>
      </main>
    </>
  );
});

export default EditorPage;
