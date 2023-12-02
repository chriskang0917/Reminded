import { observer } from "mobx-react-lite";
import { Sidebar } from "../components/Sidebar";

const ErrorPage = observer(() => {
  return (
    <>
      <Sidebar />
      <div className="px-auto ml-20 flex max-w-fit flex-col items-center">
        <h1>抱歉，您提供的路徑不存在。</h1>
      </div>
    </>
  );
});

export default ErrorPage;
