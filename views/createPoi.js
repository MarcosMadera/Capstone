import html from "html-literal";

export default state => html`
<section>
     <form id="createPoi" method="POST" action="">
      <h2>Create A POI</h2>

      <div>
        <label for="country">Country:</label>
        <select id="countrySelect">
          <option value="">Please choose a country</option>
          <option value="bolivia">Bolivia</option>
          <option value="peru">Peru</option>
        </select>
      </div>

      <div>
        <label for="city">City:</label>
        <select id="citySelect" disabled>
          <option value="">Please choose a country first</option>
        </select>
      </div>


      <div>
        <label for="description">Description:</label>
        <input type="text" id="description" name="description" required>
      </div>

      <div>
        <label for="latitude">Latitude:</label>
        <input type="text" id="latitude" name="latitude" required>
      </div>

      <div>
        <label for="longitude">Longitude:</label>
        <input type="text" id="longitude" name="longitude" required>
      </div>


     </form>
 </section>
`;
