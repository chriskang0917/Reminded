import { observer } from "mobx-react-lite";
import NoteEditor from "../components/Editor/NoteEditor";
import { Sidebar } from "../components/Sidebar";

const content = "<p>Hello World!</p>";

const EditorPage = observer(() => {
  return (
    <>
      <Sidebar />
      <main className="ml-20 mt-10">
        <div className="px-auto mx-auto flex max-w-fit flex-col items-center">
          <h1>Editor</h1>
          {/* {editor && <FloatingMenu editor={editor as Editor}>HI</FloatingMenu>} */}
          <NoteEditor content={content} />
        </div>
      </main>
    </>
  );
});

export default EditorPage;
