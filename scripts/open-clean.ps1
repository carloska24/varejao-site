$ts = Get-Date -UFormat %s
$url = "http://localhost:3000/clean/?reset=1&v=$ts"
Start-Process $url
