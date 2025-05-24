import PlayersPage from "@ui/design-system/components/pages/PlayersPage";
import { players } from "../../../../../packages/data/players";

export default function Players() {
  return <PlayersPage players={players} />;
}
