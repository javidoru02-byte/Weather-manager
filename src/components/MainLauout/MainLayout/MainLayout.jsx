import InfoPanel from "../InfoPanel/InfoPanel";
import ChartsPanel from "../ChartsPanel/ChartsPanel";
import Buttons from "../Buttons/Buttons";
import "./MainLayout.css";

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
