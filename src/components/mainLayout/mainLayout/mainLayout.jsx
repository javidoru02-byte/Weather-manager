import InfoPanel from "../infoPanel/infoPanel";
import ChartsPanel from "../chartsPanel/chartsPanel";
import Buttons from "../buttons/buttons";
import "./mainLayout.css";

function MainLayout() {
  return (
    <main className="mainLayout">
      <div className="mainLayoutLeft">
        <InfoPanel  />
        <ChartsPanel />
      </div>
      <div className="mainLayoutRight">
        <Buttons />
      </div>
    </main>
  );
}

export default MainLayout;
