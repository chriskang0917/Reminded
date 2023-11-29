import { Input } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { CiSearch } from "react-icons/ci";

interface IdeaSearchInputProps {
  searchText: string;
  onSearch: (text: string) => void;
}

export const IdeaSearchInput = observer(
  ({ searchText, onSearch }: IdeaSearchInputProps) => {
    return (
      <div className="my-4 w-full items-center justify-center gap-2">
        <Input
          value={searchText}
          onValueChange={onSearch}
          placeholder="尋找你的靈感..."
          startContent={<CiSearch />}
          size="sm"
          variant="bordered"
        />
      </div>
    );
  },
);
