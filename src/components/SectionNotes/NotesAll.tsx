import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { style } from "../../utils/style";

const Title = "所有筆記";

export const NotesAll = observer(() => {
  return (
    <div className="mx-auto mt-10 flex flex-col items-center">
      <h1 className={style.mainTitle}>{Title}</h1>
      <Divider />
      <ul className="mt-5 grid w-full gap-3"></ul>
    </div>
  );
});
