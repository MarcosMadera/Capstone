import html from "html-literal";
import map from "../assets/images/WorldMap.jpg";

export default () => html`
<section>
      <h2>About My Project</h2>
      <p>This is the main page where you can learn about my project and how to use it.</p>
      <ol>
        <li>Hover over your chosen country</li>
        <li>Click on that country</li>
        <li>Happiness ensues as you learn about your chosen country.</li>
      </ol>
      <img src="${map}" alt="Picture of World Map">
</section>
`
