import Characters from "./Characters/Characters";
import backgroundImage from "./assets/starwarsBG.jpeg";

const rootStyles = {
  position: "relative",
  minHeight: "100vh", // Ensure full viewport height
};

const backgroundImageStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1, // Move the background image behind other content
  backgroundImage: `url(${backgroundImage})`, // Use the imported image
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  filter: "blur(5px)", // Apply blur effect
};

function App() {
  return (
    <div style={rootStyles}>
      <div style={backgroundImageStyle}></div>
      <Characters />
    </div>
  );
}

export default App;
