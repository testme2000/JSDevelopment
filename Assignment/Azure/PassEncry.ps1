<# Set and encrypt credentials to file using default method #>

$credential = Get-Credential
$credential.Password | ConvertFrom-SecureString | Set-Content azureconnect.txt
