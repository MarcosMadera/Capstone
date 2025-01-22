import html from "html-literal";

export default (state) => html`
<section>
      <h2>About My Project</h2>
      <p>This is the main page where you can learn about my project and how to use it.</p>
      <ol>
        <li>Hover over your chosen country</li>
        <li>Click on that country</li>
        <li>Happiness ensues as you learn about your chosen country.</li>
      </ol>

      <div>
        <select id=countrySelect>
          <option value="">Please choose a country</option>
          ${
            state.countries.map(country => `<option value="${country}">${country}</option>`)
          }
        </select>
      </div>

      <a title="DavoO, CC BY-SA 3.0, via Wikimedia Commons"
     href="https://commons.wikimedia.org/wiki/File:South_America-en.svg"
     target="_blank">
    <img width="512" alt="South America-en"
         src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/South_America-en.svg/512px-South_America-en.svg.png?20101223140331">
  </a>
</section>
`
