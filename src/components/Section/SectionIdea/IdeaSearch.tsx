import { observer } from "mobx-react-lite";
import { useSearch } from "../../../hooks/useSearch";
import { IdeaCard } from "../../Card";
import { Heading, HeadingDivider } from "../../Heading";
import { IdeaSearchInput } from "../../Input";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const title = "搜尋靈感";
const subtitle = "靈感";

export const IdeaSearch = observer(() => {
  const { text, total, searchCountsText, onSearch, results } =
    useSearch("idea");

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={total} />
      <IdeaSearchInput searchText={text} onSearch={onSearch} />
      <p className="ml-6 self-start text-sm text-gray-400 md:ml-0">
        {searchCountsText}
      </p>
      <HeadingDivider />
      <SectionShadow className="h-[calc(100svh-250px)]">
        <MotionList>
          {results.map((card) => (
            <MotionItem key={card.item.id}>
              <IdeaCard card={card.item} />
            </MotionItem>
          ))}
        </MotionList>
      </SectionShadow>
    </>
  );
});
