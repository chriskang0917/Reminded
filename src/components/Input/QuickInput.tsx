import { Divider } from "@nextui-org/react";

function QuickInput() {
  return (
    <div className="relative w-full">
      <Divider className="relative my-2 w-full" />
      <input type="text" className="w-full border-2" />
      <Divider className="relative my-2 w-full" />
    </div>
  );
}

export default QuickInput;
