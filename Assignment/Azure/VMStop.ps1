$Cred = Get-Credential
Connect-AzAccount -Credential $Cred
Stop-AzVM -ResourceGroupName "SAZ09AVMJenkinsCI" -Name "SAZDOCNDLINUX99"