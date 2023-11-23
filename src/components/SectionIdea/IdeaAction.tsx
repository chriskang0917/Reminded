import { observer } from "mobx-react-lite";
import { style } from "../../utils/style";

const Title = "已轉換靈感";

export const IdeaAction = observer(() => {
  return (
    <section className="ml-52">
      <div className="mx-auto mt-10 flex max-w-[500px] flex-col items-center">
        <h1 className={style.mainTitle}>{Title}</h1>
        {/* <p className={style.infoTitle}>{ideaCountsText}</p>
        <IdeaSearchInput searchText={text} onSearch={onSearch} />
        <h2 className={style.subTitle}>Results</h2>
        <Divider />
        <p className={cn(style.infoTitle, "mt-2")}>{searchCountsText}</p>
        <ul className="mt-5 grid w-full gap-3">
          {results.map((card) => (
            <li key={card.item.id}>
              <IdeaCard card={card.item} />
            </li>
          ))}
        </ul> */}
      </div>
    </section>
  );
});
