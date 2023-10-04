<!DOCTYPE HTML>
<html>
<head>
  <title>Test Hub Button</title>
  <script src="hub.min.js"></script>
</head>
<body>
  <span id="pagarme-hub"></span>
</body>

<script>

// hub config
let config = {
  publicAppKey : "821f3c02-d714-4247-96a3-55c7251d466d",
  redirectUrl : "https://api.stg.prepi.com.br/gateway/v5pagarme/installation",
  language: "pt-BR",
  environment: "production"
  //installId: "00000000-0000-0000-0000-000000000000"
};

// run and create button
Hub(config);

</script>
</html>
