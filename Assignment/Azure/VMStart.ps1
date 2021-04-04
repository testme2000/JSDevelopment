
# To Run this Powershell script, it need PowerShell 7.0. If you want run the code in Powershell/VSCode. 
# Start it in admin mode by using Run as Administrator
$Cred = Get-Credential
Connect-AzAccount -Credential $Cred
Start-AzVM -ResourceGroupName "SAZ09AVMJenkinsCI" -Name "SAZDOCNDLINUX99"