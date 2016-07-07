<h2>Place Order</h2>
<ul style="list-style: none;">
  <li><div id='price'></div></li>
</ul>

  <table style="background-color:#E6E6FA; width: 400px">
    <tr>
      <td>
      Action:
      </td><td><select name="action" form="placeorderform">
        <option value="buy">buy</option>
        <option value="sell">sell</option>
      </select>
      </td>
    </tr>
    <tr>
      <td>Amount:</td>
      <td><input type="text" name="amount" id="amount" min="0" value="1" form="placeorderform"></td>
    </tr>
    <tr>
      <td>Total:</td>
      <td><div id="total">{{price}}</div></td></td>
    </tr>
  </table>
<form id="placeorderform" method="post" action="/" >
  <input type="text" name="unitprice" id="unitprice" hidden=true form="placeorderform">
  <input type="submit" value="Submit">
</form>
<script>

</script>
