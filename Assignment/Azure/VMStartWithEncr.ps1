$email = "n_dixit@yahoo.com"
$encryptedpwd = Get-Content azureconnect.txt | ConvertTo-SecureString
$Cred = New-Object System.Management.Automation.PsCredential($email, $encryptedpwd)

Connect-AzAccount -Credential $Cred
Start-AzVM -ResourceGroupName "SAZ09AVMJenkinsCI" -Name "SAZDOCNDLINUX99"