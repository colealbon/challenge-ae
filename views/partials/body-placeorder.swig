<h2>Place Order</h2>
<ul style="list-style: none;">
  <li><div id='price'></div></li>
</ul>
<form id="placeorder" method="post" style="background-color:#E6E6FA; width: 400px">
  <table width="100">
    <tr>
      <td>
      Action:
      </td><td><select>
        <option value="buy">buy</option>
        <option value="sell">sell</option>
      </select>
      </td>
    </tr>
    <tr>
      <td>Amount:</td>
      <td><input type="text" name="amount" id="amount" min="0" value="1"></td>
    </tr>
    <tr>
      <td>Total:</td>
      <td><div id="total">{{price}}</div></td></td>
    </tr>
  </table>
  <input type="button" onclick="alert('Hello World!')" value="Submit">
</form>
