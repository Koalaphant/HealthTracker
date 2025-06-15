import { findAllLogs } from "../actions/action";
import LogList from "../Components/LogList";

export default async function viewLogs() {
  const logs = await findAllLogs();

  return (
    <>
      <LogList logs={logs} />
    </>
  );
}
