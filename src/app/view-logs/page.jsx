import { getAllUniqueLogDates } from "../actions/action";
import LogsByDate from "../Components/LogsByDate";

export default async function ViewLogsPage() {
  const dates = await getAllUniqueLogDates();

  return <LogsByDate dates={dates} />;
}
