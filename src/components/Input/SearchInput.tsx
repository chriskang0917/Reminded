import { Input } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { CiSearch } from "react-icons/ci";
import { uiStore } from "../../store/uiStore";

interface SearchInputProps {
  searchText: string;
  onSearch: (text: string) => void;
  placeholder?: string;
}

export const SearchInput = observer(
  ({ searchText, onSearch, placeholder }: SearchInputProps) => {
    return (
      <div className="mx-auto my-4 w-11/12 items-center justify-center gap-2 md:w-full">
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
