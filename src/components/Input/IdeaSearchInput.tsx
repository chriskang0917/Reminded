import { Input } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { CiSearch } from "react-icons/ci";
import { uiStore } from "../../store/uiStore";

interface IdeaSearchInputProps {
  searchText: string;
  onSearch: (text: string) => void;
  placeholder?: string;
}

export const IdeaSearchInput = observer(
  ({ searchText, onSearch, placeholder }: IdeaSearchInputProps) => {
    return (
      <div className="my-4 w-full items-center justify-center gap-2">
        <Input
          value={searchText}
          onValueChange={onSearch}
          placeholder={placeholder || "請輸入關鍵字..."}
          startContent={<CiSearch />}
          onFocus={() => uiStore.setInputEditing()}
          onBlur={() => uiStore.stopInputEditing()}
          size="sm"
          variant="bordered"
        />
      </div>
    );
  },
);
