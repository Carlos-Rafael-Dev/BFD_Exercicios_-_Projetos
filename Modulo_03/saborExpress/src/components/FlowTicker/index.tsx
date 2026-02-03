import Marquee from "react-fast-marquee";
import "../../styles/FlowTicker.css";

export default function FlowTicker() {
  return (
    <Marquee
      speed={70}
      gradient={false}
      pauseOnHover={false}
      className="ticker-marquee"
    >
      <div className="ticker-row">
        <div className="texto">
          <span>1. Escolheu</span>
          <span>2. Pediu</span>
          <span>3. Chegou</span>
        </div>

        <div className="emojis">
          <span>🥦</span>
          <span>🥕</span>
          <span>🍅</span>
        </div>
      </div>
    </Marquee>
  );
}
