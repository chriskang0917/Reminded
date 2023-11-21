import { useParams } from "react-router-dom";
import { Search } from "../../components/SectionIdea/Search";

function ActionPage() {
  const { type } = useParams();

  switch (type) {
    case "all":
      return <section>All</section>;

    case "search":
      return (
        <section>
          <Search />
        </section>
      );

    case "overdue":
      return <section>Overdue</section>;

    case "executed":
      return <section>Executed</section>;

    case "archive":
      return <section>Archive</section>;

    default:
      return <section>404</section>;
  }
}

export default ActionPage;
