import "./Main.css";
import Weatherinfo from "../infopanel/InfoPanel";
import Chart from "../chartpanel/Chartpanel";
function Main() {
  return (
    <div>
      <Weatherinfo />
      <Chart />
    </div>
  );
}

export default Main;
