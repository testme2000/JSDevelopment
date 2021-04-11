$email = "n_dixit@yahoo.com"
$encryptedpwd = Get-Content azureconnect.txt | ConvertTo-SecureString
$Cred = New-Object System.Management.Automation.PsCredential($email, $encryptedpwd)

Connect-AzAccount -Credential $Cred
$Result = Stop-AzVM -ResourceGroupName "SAZ09AVMJenkinsCI" -Name "SAZDOCNDLINUX99" -Force | Select-Object Status
if ($Result.Status -eq "Succeeded")
{
    Write-Output("Azure VM is stopped")
}
